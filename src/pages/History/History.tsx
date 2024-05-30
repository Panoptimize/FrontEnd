import React from "react";
import { AgentCard } from "../../components/AgentCard";
import { ChoiceBox } from "../../components/ChoiceBoxes/ChoiceBox";
import { SearchBox } from "../../components/SearchBox";
import { FeedbackCard } from "../../components/FeedbackCard";
import { Button } from "../../components/Button";
import { NotesRow } from '../../components/NotesRow'


const History: React.FC = () => {


  return (
    <div className="flex flex-auto flex-col p-6">
      <h1 className="font-poppins font-semibold text-3xl mb-5">History</h1>

      <div>
        <AgentCard/>
      </div>
    </div>

 
  );
};

export default History;
