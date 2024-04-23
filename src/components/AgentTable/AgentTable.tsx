import React from 'react'
import { AgentTableRow } from '../AgentTableRow';
import './AgentTable.css';

const AgentTable = () => {
  return (
    <div className='btn-container'>
        <table className='btn-table'>
            <thead className='btn-header'>
                <tr className='btn-headerrow'>
                    <th className='py-2 px-4'>Names</th>
                    <th className='py-2 px-4'>Workspace</th>
                    <th className='py-2 px-4'>Overall Score</th>
                    <th className='py-2 px-4'>Last Activity</th>
                    <th className='py-2 px-4 text-white'>Details</th>
                </tr>
            </thead>
            <tbody className='btn-body'>
                <AgentTableRow
                 agentImage={'https://saki.ichoria.org/f/y3gml/Mark_Hamill_by_Gage_Skidmore_2.jpg'}
                 name="Mark Hamill"
                 workspace1='Sales'
                 workspace2='Delivery'
                 overallScore={98}
                 lastActivity='Now'
                 details='View details'/>
            </tbody>
            <tbody className='btn-body'>
                <AgentTableRow
                 agentImage={'https://saki.ichoria.org/f/hlfkz/Dwayne__The_Rock__Johnson_Visits_the_Pentagon_(41)_(cropped).jpg'}
                 name="Dwayne Johnson"
                 workspace1='Sales'
                 workspace2='Reservations'
                 overallScore={99}
                 lastActivity='Now'
                 details='View details'/>
            </tbody>
            <tbody className='btn-body'>
                <AgentTableRow
                 agentImage={'https://saki.ichoria.org/f/kmbpj/Natalie_Portman_2023.jpg'}
                 name="Natalie Portman"
                 workspace1='Sales'
                 workspace2='Payments'
                 overallScore={88}
                 lastActivity='Now'
                 details='View details'/>
            </tbody>
            <tbody className='btn-body'>
                <AgentTableRow
                 agentImage={'https://saki.ichoria.org/f/51ww1/thor-natalie-1650551487.jpeg'}
                 name="Jane Foster"
                 workspace1='Payments'
                 overallScore={92}
                 lastActivity='Now'
                 details='View details'/>
            </tbody>
        </table>
    </div>
  )
}

export default AgentTable