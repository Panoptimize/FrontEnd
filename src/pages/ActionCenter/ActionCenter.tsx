import React, { useState, useEffect } from "react";
import { Sidebar } from "../../components/Sidebar";
import { Topbar } from "../../components/Topbar";
import { StatusCard } from "../../components/StatusCard";
import { getStatus } from '../../services';
import { IStatusCard } from '../../components/StatusCard/types';
import { IRowAC } from "../../components/RowAC/types";
import { TableAC } from "../../components/TableAC"; // Asegúrate de que la ruta de importación es correcta
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

const ActionCenter: React.FC = () => {
    const [status, setStatus] = useState<IStatusCard[]>([]);
    const [rows, setRows] = useState<IRowAC[]>([]);
    const [agents, setAgents] = useState<IAgent[]>([]);


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
            setAgents(agentsData);
        } catch (error) {
            console.error("Error fetching agents:", error);
        }
    };

    const fetchContacts = async () => {
        const searchContactsDTO = {
            instanceId: "7c78bd60-4a9f-40e5-b461-b7a0dfaad848",
            timeRange: {
                startTime: "2024-05-01",
                endTime: "2024-05-31",
                type: "DISCONNECT_TIMESTAMP"
            }
        };
        const contacts = await getActionCenter(searchContactsDTO);
        const rowsData = contacts.map((contact: any) => {
            const agent = agents.find(agent => agent.id === contact.agentId);
            return {
                currentTime: new Date(contact.initiationTimestamp).toLocaleString(),
                agentImage: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`, // Imagen aleatoria para el agente
                name: agent ? agent.name : "Unknown Agent", // Nombre del agente
                status: "Online", // Estado por defecto del agente
                agentId: agent ? agent.workspace : "Unknown Workspace", // Workspace del agente
                temperature: contact.sentiment,
                channel: contact.channel
            };
        });
        setRows(rowsData);
    };

    useEffect(() => {
        getAgentsStatus();
        fetchAgents();
    }, []);

    useEffect(() => {
        if (agents.length > 0) {
            fetchContacts();
        }
    }, [agents]);

    useEffect(() => {
        const interval = setInterval(() => {
            setRows(prevRows => updateTemperatures(prevRows));
        }, 5000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    const highTemperatureRows = rows.filter(row => row.temperature === 'Negative');
    const otherTemperatureRows = rows.filter(row => row.temperature !== 'Negative');

    return (
        <div className="flex">
            <div className="flex">
            </div>
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