import React from "react";
import { HistoryCard } from "../../components/HistoryCard";

const History: React.FC = () => {
  return (
    <div>
      <div className="font-poppins pt-6 pb-0 px-6">
        <h1 className="font-semibold text-3xl">History</h1>
        <HistoryCard></HistoryCard>
      </div>
    </div>
  );
};

export default History;
