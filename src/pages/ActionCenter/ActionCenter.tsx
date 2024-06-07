import React, { useEffect, useState } from 'react'
import { StatusCard } from '../../components/StatusCard'
import { getStatus } from '../../services';
import { IStatusCard } from '../../components/StatusCard/types';

const ActionCenter: React.FC = () => {
  // State variables
  const { setNotifications } = useOutletContext<{ setNotifications: (notifications: Notification[]) => void }>();
    const [status, setStatus] = useState<IStatusCard[]>([]);
    const [rows, setRows] = useState<IRowAC[]>(() => {
      // Load rows from session storage or set to default if not available
      const savedRows = sessionStorage.getItem('rows');
      return savedRows ? JSON.parse(savedRows) : [];
    });
    const [agents, setAgents] = useState<IAgent[]>([]);
    const [contactsFetched, setContactsFetched] = useState(false);
    const prevNegativeRows = useRef<Set<string>>(new Set());
  
  // Functions
    // Fetch agents status
  const getAgentsStatus = async () => {
    console.log('entre')
    const result = await getStatus();
    console.log(result, 'res');
    if (result?.error) {
      console.error(result.error);
    } else {
      setStatus(result?.data);
    }
  };

  useEffect(()=> {
      getAgentsStatus();
  }, [])

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
          }, [agents, contactsFetched, fetchContacts]);

      // Use useEffect to start the timer when the component mounts
      useEffect(() => {
   
        getAgentsStatus();
    }, []);

  return (
    <div>
            {/* Title and Active Agents */}
            <div className="font-poppins pt-6 pb-0 px-6">
                  <h1 className="font-semibold text-3xl">
                      Action Center
                  </h1>
                  <p className="text-gray-600 pt-4 px-4 text-lg">
                      Agents
                  </p>
            </div>
            <div className="flex flex-row justify-between items-stretch w-full px-20">
                {status.map((item, index) => (
                    <StatusCard key={index} status={item.status} numUsers={item.numUsers} />
                ))}
        
            </div>

    </div>
  )
}

export default ActionCenter