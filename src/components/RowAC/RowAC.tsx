import React from 'react';
import { IRowAC } from './types';
import { UserInfoCard } from '../UserInfoCard'; // Asegúrate de ajustar la ruta según sea necesario

const RowAC: React.FC<IRowAC> = ({ date, initiationHour, currentTime, agentImage, name, status, agentId, temperature, channel }) => { // Añadimos los nuevos atributos aquí

    const alarm = temperature === 'Negative';

    const rowClass = alarm ? 'bg-red-100 p-4 rounded-lg' : 'bg-gray-100 p-4 rounded-lg';
    const callStatusClass = 'text-black';

    const getTemperatureClass = (temperature: string) => {
        switch (temperature) {
            case 'Negative':
                return 'text-red-500';
            case 'Neutral':
                return 'text-yellow-500';
            case 'Positive':
                return 'text-green-500';
            default:
                return '';
        }
    };

    const temperatureClass = getTemperatureClass(temperature || 'Neutral');

    return (
        <tr className={rowClass}>
            <td className={callStatusClass}>
                {date}
            </td>
            <td className={callStatusClass}>
                {initiationHour}
            </td>
            <td className={callStatusClass}>
                {currentTime}
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
                <span className="bg-cyan-100 text-black py-1 px-4 rounded-md mx-1">
                    {agentId}
                </span>
            </td>
            <td className={temperatureClass}>{temperature || 'Neutral'}</td>
            <td>{channel}</td>
        </tr>
    );
};

export default RowAC;
