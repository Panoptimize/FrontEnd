import React, { useState, useEffect } from "react";
import { StatusCard } from "../../components/StatusCard";
import { getStatus } from '../../services';
import { IStatusCard } from '../../components/StatusCard/types';
import { IRowAC } from "../../components/RowAC/types";
import { TableAC } from "../../components/TableAC";
import { getActionCenter } from '../../services/actionCenter/getActionCenter';
import { getAgentsList } from '../../services/agentsList/getAgentsList';
import { IAgent } from "../../components/AgentTable/types";

const updateTemperatures = (rows: IRowAC[]): IRowAC[] => {
    const temperatures = ['Positive', 'Neutral', 'Negative'];
    const getRandomElement = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

    return rows.map(row => ({
        ...row,
        temperature: getRandomElement(temperatures),
    }));
};

const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor(totalSeconds % 3600 / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const ActionCenter: React.FC = () => {
    const [status, setStatus] = useState<IStatusCard[]>([]);
    const [rows, setRows] = useState<IRowAC[]>([]);
    const [agents, setAgents] = useState<IAgent[]>([]);
    const [contactsFetched, setContactsFetched] = useState(false);

    const getAgentsStatus = async () => {
        const result = await getStatus("7c78bd60-4a9f-40e5-b461-b7a0dfaad848");
        if (result.error) {
            console.error(result.error);
        } else {
            setStatus(result.data); 
        }
    };

    const fetchAgents = async () => {
        try {
            const agentsData = await getAgentsList();
            console.log("AgentList JSON Response:", JSON.stringify(agentsData, null, 2)); // Print JSON on console
            setAgents(agentsData);
        } catch (error) {
            console.error("Error fetching agents:", error);
        }
    }; 

    const addContactsWithDelay = (contacts: IRowAC[], index: number = 0) => {
      if (index < contacts.length) {
          setRows(prevRows => [...prevRows, {
              ...contacts[index],
              currentTime: formatTime(0) // Starting time from 0
          }]);
          setTimeout(() => addContactsWithDelay(contacts, index + 1), 5000); // Delay between each contact
      }
    };

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
        //setRows(rowsData);
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
  
      // Fetch contacts once after agents are loaded
      useEffect(() => {
          if (agents.length > 0 && !contactsFetched) {
              fetchContacts();
              setContactsFetched(true); // Ensure contacts are fetched only once
          }
      }, [agents]);

    useEffect(() => {
        const interval = setInterval(() => {
            setRows(prevRows => prevRows.map(row => {
                const [hours, minutes, seconds] = (row.currentTime || '00:00:00').split(':').map(Number);
                const totalSeconds = (hours * 3600) + (minutes * 60) + seconds + 1;
                return {
                    ...row,
                    currentTime: formatTime(totalSeconds),
                };
            }));
        }, 1000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setRows(prevRows => updateTemperatures(prevRows));
        }, 15000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    const highTemperatureRows = rows.filter(row => row.temperature === 'Negative');
    const otherTemperatureRows = rows.filter(row => row.temperature !== 'Negative');

    return (
        <div className="flex">
            <div className="flex flex-col flex-auto">
                <div className="font-poppins pt-6 pb-0 px-6">
                    <h1 className="font-semibold text-3xl">Action Center</h1>
                    <p className="text-gray-600 pt-4 px-4 text-lg">Agents</p>
                </div>
                <div className="flex flex-row justify-between items-stretch w-full px-20">
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
