import React from 'react';
import ProgressBarCallStat from './components/ProgressBarCallStat'; 
import CallTemp from './components/CallTemp';

function App(){

  return (
      <div className='APP'>
          <ProgressBarCallStat />
        <div className='flex items-center justify-center h-screen mt-2'>
        <div>
          <div>
            <h1 className='text-blue-500 underline decoration-solid'>Prueba Muestra de Temperatura:</h1>
          </div>
          <div>
            <p className='text-center'><CallTemp level="Low" /></p>
          </div>
          <div>
            <p className='text-center'><CallTemp level="Medium" /></p>
          </div>
          <div>
            <p className='text-center'><CallTemp level="High" /></p>
          </div>
        </div>
          
        </div>
      </div>
      
  );
};

export default App;
