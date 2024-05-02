import React from 'react';
import { IDataCard } from './types'

const DataCard: React.FC<IDataCard> =({
    title,
    content
}) => {
  return (
    <a className="block h-20 w-40 px-2 pt-3 pb-2 bg-white border border-gray-200 rounded-3xl shadow flex flex-col justify-center items-start" style={{ minWidth: "180px", width: "180px", height: "105px" }}>
      <div className="flex-grow-0">
        <h4 className="ml-2 font-bold text-sm text-gray-700 dark:text-black-400">{title}</h4>
      </div>
      <div className="flex-grow flex items-center">
        <h5 className="ml-2 text-xl font-bold tracking-tight text-gray-900 dark:text-grey">{content}</h5>
      </div>
    </a>
  );
};

export default DataCard;