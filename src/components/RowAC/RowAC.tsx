import React, {useState} from 'react'
import './RowAC.css'
import { IRowAC } from './types'




const RowAC: React.FC<IRowAC> = ({callstatus, agentImage ,name, status,  workspace1, workspace2, workHours, alarm}) => {
    
    const rowClass = alarm ? 'btn-row-alarm' : 'btn-row';
    const leftRowClass = alarm ? 'btn-leftcell-alarm' : 'btn-leftcell';
    const rightRowClass = alarm ? 'btn-rightcell-alarm' : 'btn-rightcell';
    const callStatusClass = alarm ? 'btn-callstatus-alarm' : 'btn-callstatus';
    
    const callStatusText = alarm ? 'help' : callstatus;
    

  return (
    
    <tr className={rowClass}>
        <td className={leftRowClass}>
            <div className={callStatusClass}>
                {callStatusText}
            </div>
        </td>
        <td>
            <div className='flex items-center gap-2'>
                <img src={agentImage} alt='user' className='w-8 h-8 rounded-full' />
                <div>
                    <p className='font-semibold'>{name}</p>
                    <p className='text-xs text-gray-500'>
                        <span className='text-green-500'>{status}</span> - 2m ago
                    </p>
                </div>
            </div>
        </td>
        <td>
            <button className="bg-[#C9F7F5] text-black py-1 px-4 rounded-md mx-3">
                {workspace1}
            </button>
            <button className="bg-[#C9F7F5] text-black py-1 px-4 rounded-md ">
                {workspace2}
            </button>

        </td>
        <td>{workHours}</td>
        <td>
            <div>
                <button className=' text-black py-1 px-4'>
                    <img src='https://img.icons8.com/ios/50/000000/phone.png' alt='phone' className='w-4 h-4' />
                </button>
                <button className=' text-black py-1 px-4'>
                    <img src='https://img.icons8.com/ios/50/000000/chat.png' alt='chat' className='w-4 h-4' />
                </button>
                <button className=' text-black py-1 px-4'>
                    <img src='https://img.icons8.com/ios/50/000000/video-call.png' alt='video' className='w-4 h-4' />
                </button>
            </div>
        </td>
        <td>
            <button className='bg-[#008F89] text-white font-semibold py-1 px-4 rounded-md'>
                View Details
            </button>
        </td>
        <td className={rightRowClass} >
            <img src='https://img.icons8.com/ios/50/000000/edit.png' alt='edit' className='w-4 h-4 justify-center' />
        </td>
    </tr>
    
  )
}

export default RowAC;