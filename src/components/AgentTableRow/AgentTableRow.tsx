import React from 'react'
import './AgentTableRow.css'
import { IAgentTableRow } from './types'

const AgentTableRow: React.FC<IAgentTableRow> = ({agentImage ,name, workspace1, workspace2, overallScore, lastActivity, details}) => {
  return (
    <tr className='btn-row'>
        <td className='btn-leftcell'>
            <div className='flex items-center gap-2'>
                <img src={agentImage} alt='user' className='w-8 h-8 rounded-full' />
                <div>
                    <p className='font-semibold'>{name}</p>
                </div>
            </div>
        </td>
        <td>
            <button className="bg-[#C9F7F5] text-black py-1 px-4 rounded-md mx-3">
                {workspace1}
            </button>
            {workspace2 && (
                <button className="bg-[#C9F7F5] text-black py-1 px-4 rounded-md ">
                    {workspace2}
                </button>
            )}
        </td>
        <td>{overallScore} / 100</td>
        <td>
            <p>{lastActivity}</p>
        </td>
        <td>
            <button className='bg-[#008F89] text-white font-semibold py-1 px-4 rounded-md'>
                {details}
            </button>
        </td>
    </tr>
  )
}

export default AgentTableRow;