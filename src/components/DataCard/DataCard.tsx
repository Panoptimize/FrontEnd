import React from 'react';
import { IDataCard } from './types'

const DataCard: React.FC<IDataCard> = ({
  title,
  content,
  decorator
}) => {

  // Print type of
  console.log(content, typeof content)

  return (
    <div
      className="h-28 w-44 px-2 pt-3 pb-2 bg-white border border-gray-200 rounded-3xl shadow flex flex-col justify-center items-start">
      <div className="flex-grow-0">
        <h4 className="ml-2 font-bold text-sm text-gray-700 dark:text-black-400">{title}</h4>
      </div>
      <div className="flex-grow flex items-center">
        <h5 className="ml-2 text-xl font-bold tracking-tight text-gray-900 dark:text-grey">{content ? content : 0}{decorator}</h5>
      </div>
    </div>
  );
};

export default DataCard;