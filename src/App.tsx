import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ChoiceBox } from './components/ChoiceBoxes/ChoiceBox';
import { workspaces, agents,timeframes } from './components/ChoiceBoxes/ChoiceConstants';

function App() {
  return (
    <div className="App">
        <ChoiceBox boxText='Agent: ' options={agents}></ChoiceBox>

    </div>
  );
}

export default App;