import React from 'react';
import { IPill } from './types';
import './Pill.css'

const Pill: React.FC<IPill> = ({
    title,
})=>{
    return(
        <div className='flex'>
            <div className='pill'>
                {title}
            </div>
        </div>
    )
}


export default Pill;