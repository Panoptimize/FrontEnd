import React from 'react';
import RowAC from '../RowAC/RowAC'; // Asegúrate de que la ruta de importación es correcta
import { ITableAC } from './types';

const TableAC: React.FC<ITableAC> = ({ rows }) => {
    return (
        <div className='bg-white bg-opacity-50 mx-8 p-4 rounded-md'>
            <table className='table-auto border-separate text-center w-full bg-transparent border-spacing-y-3'>
                <thead className='p-4 bg-white rounded-full overflow-hidden shadow-md'>
                    <tr className='border-spacing-y-3'>
                        <th className='py-2 px-4 rounded-l-md bg-white'>Date</th>
                        <th className='py-2 px-4 bg-white'>Initiation Hour</th>
                        <th className='py-2 px-4 bg-white'>Current Time</th>
                        <th className='py-2 px-4 bg-white'>Agent</th>
                        <th className='py-2 px-4 bg-white'>Workspace</th>
                        <th className='py-2 px-4 bg-white'>Sentiment</th>
                        <th className='py-2 px-4 rounded-r-md bg-white'>Channel</th>
                    </tr>
                </thead>
                <tbody className='border-spacing-y-3 text-center'>
                    {rows.map((row, index) => (
                        <RowAC key={index} {...row} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableAC;
