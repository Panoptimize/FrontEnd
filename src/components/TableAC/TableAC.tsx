import React from 'react'
import './TableAC.css';
import RowAC from '../RowAC/RowAC'; // Asegúrate de que la ruta de importación es correcta

import { ITableAC } from './types';

const TableAC: React.FC<ITableAC> = ({ rows }) => {
  return (
    <div className='btn-container'>
        <table className='btn-table'>
            <thead className='btn-header'>
                <tr className='btn-headerRowAC'>
                    <th className='btn-header-leftcell'>Current Time</th>
                    <th className='btn-header-leftcell'>Agent</th>
                    <th className='btn-header-leftcell'>Workspace</th>
                    <th className='btn-header-leftcell'>Sentiment</th>
                    <th className='btn-header-leftcell'>Channel</th> {/* Nueva columna para Channel */}
                </tr>
            </thead>
            <tbody className='btn-body'>
                {rows.map((row, index) => (
                    <RowAC key={index} {...row} />
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default TableAC;