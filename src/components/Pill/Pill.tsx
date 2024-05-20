import React from 'react';
import { IPill } from './types';
import './Pill.css'
import { Button } from '../Button';


const Pill: React.FC<IPill> = ({title, icon,})=>{
    const isIcon = icon?.endsWith('.svg');
    if (icon && !isIcon) {
        console.error('simple pill');
        return null;
    }

    return(
        <div className='flex'>
            <div className={`pill ${!icon ? '' : ''}`}>
                <div className='title'>{title}</div>
                {icon &&(
                    <button>
                        <img className='img' src={require(`../../assets/images/${icon}`)} alt={icon}></img>
                    </button>
                )}
            </div>
        </div>
    )
}


export default Pill;