// RowAC.tsx
import React from 'react';
import './RowAC.css';
import { IRowAC } from './types';
import { UserInfoCard } from '../UserInfoCard'; // Asegúrate de ajustar la ruta según sea necesario

const RowAC: React.FC<IRowAC> = ({ currentTime, agentImage, name, status, agentId, temperature, channel }) => { // Añade channel aquí

    const alarm = temperature === 'Negative';

    const rowClass = alarm ? 'btn-row-alarm' : 'btn-row';
    const leftRowClass = alarm ? 'btn-leftcell-alarm' : 'btn-leftcell';
    const rightRowClass = alarm ? 'btn-rightcell-alarm' : 'btn-rightcell';
    const callStatusClass = alarm ? 'btn-callstatus-alarm' : 'btn-callstatus';

    const getTemperatureClass = (temperature: string) => {
        switch (temperature) {
            case 'Negative':
                return 'temperature-high';
            case 'Neutral':
                return 'temperature-medium';
            case 'Positive':
                return 'temperature-low';
            default:
                return '';
        }
    };

    const temperatureClass = getTemperatureClass(temperature || 'Low');

    return (
        <tr className={rowClass}>
            <td className={leftRowClass}>
                <div className={callStatusClass}>
                    {currentTime}
                </div>
            </td>
            <td>
                <div className='flex items-center gap-2'>
                    <img src={agentImage} alt='user' className='w-8 h-8 rounded-full' />
                    <div>
                        <p className='font-semibold'>{name}</p>
                        <p className='text-xs text-gray-500'>
                            <span className='text-green-500'>{status}</span>
                        </p>
                    </div>
                </div>
            </td>
            <td>
                <span className="bg-[#C9F7F5] text-black py-1 px-4 rounded-md mx-1">
                    {agentId}
                </span>
            </td>
            <td className={temperatureClass}>{temperature || 'Neutral'}</td>
            <td>{channel}</td> {/* Nueva columna para el canal */}
        </tr>
    );
};

export default RowAC;