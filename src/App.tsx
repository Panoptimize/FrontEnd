import React from 'react';
import logo from './logo.svg';
import './App.css';
import {DataCard} from './components/DataCard'
import { StatusCard } from './components/StatusCard';

function App() {
  return (
    <div className="App">
      <DataCard title='Total Contacts' content = {53} />
      <StatusCard status='Available' numUsers={4} color='bg-blue-500' />
    </div>
  );
}

export default App;
