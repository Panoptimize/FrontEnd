import React, { useState, useEffect, useRef } from "react";
import { StatusCard } from "../../components/StatusCard";
import { getStatus } from '../../services';
import { IStatusCard } from '../../components/StatusCard/types';

import { IRowAC } from "../../components/RowAC/types";
import { TableAC } from "../../components/TableAC";
import { getActionCenter } from '../../services/actionCenter/getActionCenter';
import { getAgentsList } from '../../services/agentsList/getAgentsList';
import { IAgent } from "../../components/AgentTable/types";
import { useOutletContext } from "react-router-dom";
import { Notification } from "../../components/Topbar/types";

// Function to update temperatures simulating real-time data from contact lens
const updateTemperatures = (rows: IRowAC[]): IRowAC[] => {
  const temperatures = ['Positive', 'Neutral', 'Negative'];
  const getRandomElement = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  return rows.map(row => ({
    ...row,
    temperature: getRandomElement(temperatures),
  }));
};


// Function to format time in HH:MM:SS format
const formatTime = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor(totalSeconds % 3600 / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

// Main component
const ActionCenter: React.FC = () => {
  // State variables
  const { setNotifications } = useOutletContext<{ setNotifications: (notifications: Notification[]) => void }>();
  const [rows, setRows] = useState<IRowAC[]>(() => {
    // Load rows from session storage or set to default if not available
    const savedRows = sessionStorage.getItem('rows');
    return savedRows ? JSON.parse(savedRows) : [];
  });
  const [agents, setAgents] = useState<IAgent[]>([]);
  const [contactsFetched, setContactsFetched] = useState(false);
  const [status, setStatus] = useState<IStatusCard[]>([]);
  const prevNegativeRows = useRef<Set<string>>(new Set());

  // Fetch agents list
  const fetchAgents = async () => {
    try {
      const agentsData = await getAgentsList();
      setAgents(agentsData);
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  };

  // Update Timer
  const updateTimer = () => {
    setRows(prevRows => prevRows.map(row => {
      const startTime = sessionStorage.getItem(`startTime-${row.agentId}`);
      const start = startTime ? new Date(parseInt(startTime, 10)).getTime() : new Date().getTime();
      const now = new Date().getTime();
      const totalSeconds = Math.floor((now - start) / 1000);
      return {
        ...row,
        currentTime: formatTime(totalSeconds),
      };
    }));
  };
  // Function to get a random delay between contacts
  function getRandomDelay(min = 5000, max = 8000) {
    return Math.random() * (max - min) + min;
  }

  // Add contacts with delay using historical data from amazon Connect
  const addContactsWithDelay = (contacts: IRowAC[], index: number = 0) => {
    if (index < contacts.length) {
      setRows(prevRows => {
        const currentContact = contacts[index];
        // Check if the contact already exists in the current rows
        const exists = prevRows.some(row => row.agentId === contacts[index].agentId && row.initiationHour === contacts[index].initiationHour);
        if (!exists) {
          const now = new Date();
          sessionStorage.setItem(`startTime-${contacts[index].agentId}`, now.getTime().toString());
          return [...prevRows, {
            ...currentContact,
            currentTime: formatTime(0) // Starting time from 0
          }];
        }
        return prevRows;
      });
      //setTimeout(() => addContactsWithDelay(contacts, index + 1), 3000); // Delay between each contact
      setTimeout(() => addContactsWithDelay(contacts, index + 1), getRandomDelay());
    }
  };

  // Fetch contacts from Amazon Connect
  const fetchContacts = async () => {
    const searchContactsDTO = {
      instanceId: "7c78bd60-4a9f-40e5-b461-b7a0dfaad848",
      timeRange: {
        startTime: "2024-05-01",
        endTime: "2024-05-31",
        type: "CONNECTED_TO_AGENT_TIMESTAMP"
      }
    };
    const contacts = await getActionCenter(searchContactsDTO);
    const rowsData = contacts.map((contact: any) => {
      const agent = agents.find(agent => agent.id === contact.agentId);
      const initiationDate = new Date(contact.initiationTimestamp);
      const date = initiationDate.toLocaleDateString();
      const initiationHour = initiationDate.toLocaleTimeString();
      const currentTime = "00:00:00"; // Set initial value to 00:00:00

      return {
        date,
        initiationHour,
        currentTime,
        agentImage: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`, // Random image for the agent
        name: agent ? agent.name : "Unknown Agent",               // Agent's name
        status: "Online",                                         // Default status
        agentId: agent ? agent.workspace : "Unknown Workspace",   // Agent's workspace
        temperature: contact.sentiment,
        channel: contact.channel
      };
    });
    addContactsWithDelay(rowsData);
  };

  // Function to handle reset
  const handleReset = async () => {
    // Clear session storage for rows
    sessionStorage.removeItem('rows');
    // Reset rows and fetched status
    setRows([]);
    setContactsFetched(false);
    // Refetch contacts
    await fetchContacts();
  };

  const getAgentsStatus = async () => {
    const result = await getStatus();
    if (result.error) {
      console.error(result.error);
    } else {
      setStatus(result.data);
    }
  };

  useEffect(() => {
    getAgentsStatus();
  }, [])

  // Fetch status and agents only once
  useEffect(() => {
    const fetchInitialData = async () => {
      await fetchAgents();
    };
    fetchInitialData();
  }, []);

  // Save rows to session storage whenever it changes
  useEffect(() => {
    // Save rows to session storage whenever it changes
    sessionStorage.setItem('rows', JSON.stringify(rows));
  }, [rows]);

  // Fetch contacts once after agents are loaded
  useEffect(() => {
    if (agents.length > 0 && !contactsFetched) {
      fetchContacts();
      setContactsFetched(true); // Ensure contacts are fetched only once
    }
  }, [agents, contactsFetched, fetchContacts]);

  // Use useEffect to start the timer when the component mounts
  useEffect(() => {
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Update notifications when a new negative temperature is detected
  useEffect(() => {
    const interval = setInterval(() => {
      setRows(prevRows => {
        const newRows = updateTemperatures(prevRows);
        const newNegativeRows = new Set(newRows.filter(row => row.temperature === 'Negative').map(row => row.agentId));
        const prevNegativeRowsSet = prevNegativeRows.current;
        const newNotifications = Array.from(newNegativeRows)
          .filter(agentId => !prevNegativeRowsSet.has(agentId))
          .map(agentId => {
            const agent = newRows.find(row => row.agentId === agentId)?.name || 'Unknown Agent';
            const timestamp = new Date().toLocaleString();
            return { agentName: agent, timestamp };
          });

        if (newNotifications.length > 0) {
          setNotifications(newNotifications);
        }

        prevNegativeRows.current = newNegativeRows;
        return newRows;
      });
    }, 15000);
    return () => clearInterval(interval);
  }, [setNotifications]);

  // Filter rows based on temperature
  const highTemperatureRows = rows.filter(row => row.temperature === 'Negative');
  const otherTemperatureRows = rows.filter(row => row.temperature !== 'Negative');

  // Render component
  return (
    <div className="flex" data-testid="wrapper-ActionCenter">
      <div className="flex flex-col flex-auto">
        <div className="font-poppins pt-6 pb-0 px-6">
          <h1 className="font-semibold text-3xl">Action Center</h1>
          <p className="text-gray-600 pt-4 px-4 text-lg" data-testid="txt-agentStatus">Agents Status</p>
        </div>
        <div className="flex flex-row sm:flex-row flex-wrap justify-between mx-6 my-4">
          {status.map((item, index) => (
            <StatusCard
              key={index}
              status={item.status}
              numUsers={item.numUsers}
            />
          ))}
        </div>
        <div className="font-poppins px-6">
          <div className="flex justify-between">
            <p className="text-gray-600 pt-2 px-4 text-lg">Help Needed</p>
            <button onClick={handleReset} data-testid="reset-button" >
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Refresh.svg" alt="Reset" className="h-6 w-6 ml-4 text-gray-600 fill-current" />
            </button>
          </div>

          <TableAC rows={highTemperatureRows} />
        </div>
        <div className="font-poppins px-6">
          <p className="text-gray-600 pt-2 px-4 text-lg" data-testid="txt-CurrentAgents">Current Agents</p>
          <TableAC rows={otherTemperatureRows} />
        </div>
      </div>
    </div>
  );
}

export default ActionCenter;
