import React from 'react';
import { IPill } from './types';
import './Pill.css'

const Pill: React.FC<IPill> = ({title, icon,})=>{
    const isIcon = icon?.endsWith('.svg');
    if (icon && !isIcon) {
        console.error('simple pill');
        return null;
    }

    return(
        <div className='flex'>
            <div className={`pill ${!icon ? 'pl-4 py-2' : ''}`}>
                {title}
                {icon &&(
                    <img
                    // Work only with SVG files
                    src={require(`../../assets/images/${icon}`)}
                    //src={require(`../../assets/images/${image}${isSvg ? '' : '.png'}`)}
                    alt={icon}
                    />
                )}
            </div>
        </div>
    )
}


export default Pill;