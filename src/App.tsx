import React from 'react';
import logo from './logo.svg';
import './App.css';
import { SatisfactionChart } from './components/SatisfactionChart';
import { ActivityChart } from './components/ActivityChart';
import { ContactMedium } from './components/ContactMedium';

function App() {
  return (
    <div>
      <div className='bg-[#F2F2F2] min-h-screen'>
        <h1 className='text-xl font-bold pl-5 pt-5'> Doughnut Charts </h1>
          <div className="flex p-4">
            <div className="flex-auto">
                {/* <SatisfactionChart data={[10,20,30,10,20,0]}/> */}
                <SatisfactionChart/>
            </div>

            <div className="flex-auto">
                {/* <ContactMedium data={[90,20]}/> */}
                <ContactMedium/>
            </div>
            
          </div>

      <h1 className='text-xl font-bold pl-5 pt-5'> Line Chart </h1>
          <div className="p-4">
            {/* <ActivityChart data={[10,12,13,11,15,28,10,86,63,77,55,87]}/> */}
            <ActivityChart/>
          </div>

      </div>
    </div>
  );
}

export default App;
