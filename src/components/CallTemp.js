import React from 'react';

const CallTemp = ({ level }) => {
  let className = '';

  switch (level) {
    case 'Low':
      className = 'text-green-500'; 
      break;
    case 'Medium':
      className = 'text-orange-500'; 
      break;
    case 'High':
      className = 'text-red-500';
      break;
    default:
      className = '';
  }

  return <span className={className}>{level}</span>;
};

export default CallTemp;


/*const CallTemp = ({ data }) => {
  const getColor = (temp) => {
    switch (temp) {
      case 'Low':
        return 'green';
      case 'Medium':
        return 'orange'; 
      case 'High':
        return 'red'; 
      default:
        return 'grey'; 
    }
  };

  return (
    <div>
      {Object.keys(data).map((key) => (
        <p key={key} style={{ color: getColor(data[key]) }}>
          {key}: {data[key]}
        </p>
      ))}
    </div>
  );
};


const jsonData = {
  temperature1: 'Low',
  temperature2: 'Medium',
  temperature3: 'High',
};
*/


