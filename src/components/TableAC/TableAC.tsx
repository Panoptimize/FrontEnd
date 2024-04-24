import React from 'react'
import './TableAC.css';
import { RowAC } from '../RowAC';

import { ITableAC } from './types';


const TableAC: React.FC<ITableAC> = ({ rows }) => {
  return (
    <div className='btn-container'>
        <table className='btn-table'>
            <thead className='btn-header'>
                <tr className='btn-headerRowAC'>
                    <th className='btn-header-leftcell'>Call status</th>
                    <th >Names</th>
                    <th >Workspace</th>
                    <th >Work hours</th>
                    <th >Quick actions</th>
                    <th >View Details</th>
                    <th className='btn-header-rightcell'>Edit</th>
                </tr>
            </thead>
            <tbody className='btn-body'>
                <tr className=''>
                    <td className='btn-spacing'></td>
                    <td className='btn-spacing'></td>
                    <td className='btn-spacing'></td>
                    <td className='btn-spacing'></td>
                    <td className='btn-spacing'></td>
                    <td className='btn-spacing'></td>
                    <td className='btn-spacing'> </td>
                </tr>
                {rows.map((row, index) => (
                    <RowAC key={index} {...row} />
                ))}
                

            </tbody>
        </table>
    </div>
  )
}

export default TableAC;