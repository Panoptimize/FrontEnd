import { IRowAC } from "../../../components/RowAC/types";
import { IStatusCard } from "../../../components/StatusCard/types"

export const mockStatusData = [
    { status: 'Online', numUsers: 10 },
    { status: 'Offline', numUsers: 5 },
];

export const mockAgentsData = [
    { id: '1', name: 'Agent 1', workspace: 'Workspace 1' },
    { id: '2', name: 'Agent 2', workspace: 'Workspace 2' },
];

export const mockActionCenterData: IRowAC[] = [
    {
        date: '2024-05-01',
        initiationHour: '08:00:00',
        currentTime: '00:00:00',
        agentImage: 'https://randomuser.me/api/portraits/men/1.jpg',
        name: 'Agent 1',
        status: 'Online',
        agentId: '1',
        temperature: 'Positive',
        channel: 'Chat'
    },
    {
        date: '2024-05-01',
        initiationHour: '08:05:00',
        currentTime: '00:00:00',
        agentImage: 'https://randomuser.me/api/portraits/men/2.jpg',
        name: 'Agent 2',
        status: 'Online',
        agentId: '2',
        temperature: 'Negative',
        channel: 'Voice'
    }
];


export const mockStatusCard: IStatusCard[] = [

    {
        status: 'AGENTS',
        numUsers: 33
    },
    {
        status: 'AGENTS_ONLINE',
        numUsers: 2
    },
    {
        status: 'AGENTS_AVAILABLE',
        numUsers: 2
    },
    {
        status: 'AGENTS_OFFLINE',
        numUsers: 31
    },

]