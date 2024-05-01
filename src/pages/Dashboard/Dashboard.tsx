import React from "react";
import { Sidebar } from "../../components/Sidebar";
import { Topbar } from "../../components/Topbar";
import { StatusCard } from "../../components/StatusCard";

function App() {
    return (
        <div className="flex">
            {/* Put the sidebar and the topbar in the same row */}
            <div className="flex none">
                <Sidebar />
            </div>
            <div className="flex flex-col flex-auto">
                <Topbar />
                <div className="font-poppins pt-6 pb-0 px-6">
                    <h1 className="font-semibold text-3xl"> Dashboard </h1>
                    <p className="text-gray-600 pt-4 px-4 text-lg"> Agents </p>
                </div>
                <div className="flex flex-row justify-between items-stretch w-full px-20">
                    <StatusCard status="Available" numUsers={2}/>
                    <StatusCard status="In Contact" numUsers={3}/>
                    <StatusCard status="After Call Work" numUsers={1}/>
                    <StatusCard status="Offline" numUsers={1}/>
                </div>
            </div>
        </div>
    );
}

export default App;

