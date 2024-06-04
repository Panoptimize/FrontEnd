import React, { useState, useEffect } from "react";
import { StatusCard } from "../../components/StatusCard";
import { getStatus } from '../../services';
import { IStatusCard } from '../../components/StatusCard/types';
import { IRowAC } from "../../components/RowAC/types";
import { TableAC } from "../../components/TableAC";
import { getActionCenter } from '../../services/actionCenter/getActionCenter';
import { getAgentsList } from '../../services/agentsList/getAgentsList';
import { IAgent } from "../../components/AgentTable/types";

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
    const [status, setStatus] = useState<IStatusCard[]>([]);
    const [rows, setRows] = useState<IRowAC[]>(() => {
      // Load rows from session storage or set to default if not available
      const savedRows = sessionStorage.getItem('rows');
      return savedRows ? JSON.parse(savedRows) : [];
    });
    const [agents, setAgents] = useState<IAgent[]>([]);
    const [contactsFetched, setContactsFetched] = useState(false);
  
  // Functions
    // Fetch agents status
    const getAgentsStatus = async () => {
        const result = await getStatus("7c78bd60-4a9f-40e5-b461-b7a0dfaad848");
        if (result.error) {
            console.error(result.error);
        } else {
            setStatus(result.data); 
        }
    };

    // Fetch agents list
    const fetchAgents = async () => {
        try {
            const agentsData = await getAgentsList();
            console.log("AgentList JSON Response:", JSON.stringify(agentsData, null, 2)); // Print JSON on console
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

    // Add contacts with delay using historical data from amazon Connect
    const addContactsWithDelay = (contacts: IRowAC[], index: number = 0) => {
      if (index < contacts.length) {
        setRows(prevRows => {
          // Check if the contact already exists in the current rows
          const exists = prevRows.some(row => row.initiationHour === contacts[index].agentId);
          if (!exists) {
            const now = new Date();
            sessionStorage.setItem(`startTime-${contacts[index].agentId}`, now.getTime().toString());
            return [...prevRows, {
              ...contacts[index],
              currentTime: formatTime(0) // Starting time from 0
            }];
          }
          return prevRows;
        });
        setTimeout(() => addContactsWithDelay(contacts, index + 1), 5000); // Delay between each contact
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

        // Fetch status and agents only once
          useEffect(() => {
            const fetchInitialData = async () => {
                await getAgentsStatus();
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
          }, [agents]);

      // Use useEffect to start the timer when the component mounts
      useEffect(() => {
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval); // Cleanup on unmount
      }, []);

      // Update temperatures every 15 seconds
        useEffect(() => {
            const interval = setInterval(() => {
                setRows(prevRows => updateTemperatures(prevRows));
            }, 15000);
          return () => clearInterval(interval); // Cleanup on unmount
      }, []);

    // Filter rows based on temperature
    const highTemperatureRows = rows.filter(row => row.temperature === 'Negative');
    const otherTemperatureRows = rows.filter(row => row.temperature !== 'Negative');

    // Render component
    return (
        <div className="flex">
            <div className="flex flex-col flex-auto">
                <div className="font-poppins pt-6 pb-0 px-6">
                    <h1 className="font-semibold text-3xl">Action Center</h1>
                    <p className="text-gray-600 pt-4 px-4 text-lg">Agents</p>
                </div>
                <div className="flex flex-row justify-between place-content-evenly space-x-10 mx-6 my-4">
                    {status.map((item, index) => (
                        <StatusCard key={index} status={item.status} numUsers={item.numUsers} />
                    ))}
                </div>
                <div className="font-poppins px-6">
                    <p className="text-gray-600 pt-2 px-4 text-lg">Help Needed</p>
                    <TableAC rows={highTemperatureRows} />
                </div>
                <div className="font-poppins px-6">
                    <p className="text-gray-600 pt-2 px-4 text-lg">Current Agents</p>
                    <TableAC rows={otherTemperatureRows} />
                </div>
            </div>
        </div>
    );
}

export default ActionCenter;
