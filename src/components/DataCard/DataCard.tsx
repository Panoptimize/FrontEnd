import React from 'react';
import { IDataCard } from './types'

const DataCard: React.FC<IDataCard> =({
    title,
    content
}) => {
  return (
    <a className="block h-20 w-40 p-2 bg-white border border-gray-200 rounded-lg shadow">
      <h4 className="flex font-bold text-sm text-gray-700 dark:text-black-400">{title}</h4>
      <h5 className="flex mb-1 text-xl font-bold tracking-tight text-gray-900 dark:text-grey">{content}</h5>
    </a>



  );
};

export default DataCard;
