import React, { useState } from "react";
import { IAgentCard } from "./types";
import { Button } from "../Button";
import { Avatar } from "../Avatar";
import { Pill } from "../Pill";
import { DataCard } from "../DataCard";
import NoteCard from "../NoteCard/NoteCard";
import { NotesTable } from "../NotesTable";
import { getAgentNotes } from "../../services/notes/getAgentNotes";
import { IAgentPerformance, INoteData } from "../../pages/types";
import { getAgentId } from "../../services/agentsList/getAgentId";

const AgentCard: React.FC<IAgentCard> = ({
  bttnTitle = "View Details", //recibe nombre, email, username. Faltan metricas y como jalar 	Workspace	Last Activity y agent id	desde BE (Agent Row)
  title = "Contact Details",
  name,
  email = "dave_chapelle@gmail.com",
  workspace,
  id,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  //const [agentMetrics, setAgentMetrics] = useState<IAgentPerformance | null>(null);
  const [agentId, setAgentId] = useState<number>();

  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   username: "",
  // });

  const metrics:IAgentPerformance = {
    avgAbandonTime: 10,
    avgAfterContactWorkTime: 15,
    avgHandleTime: 20,
    avgHoldTime: 25
  }

  //const [user, setUser] = useState<any>();


  const [notesData, setNotesData] = useState<INoteData[]>([]);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  // const handleSave = () => {
  //   console.log("Guardando datos:", formData, workspace);
  //   setIsVisible(false); // Cerrar el modal después de guardar
  // };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleOpen = async () => {
    setIsVisible(true);
    //setAgentMetrics(metrics);
    try {
      const agentId = await getId(id);
      if(agentId) {
        console.log("agentId: ", agentId)
        await getNotes(agentId);
      }
    } catch (error){
      console.error(error);
    }
  };

  const getId = async (id:string) => {
    try {
      const data = await getAgentId(id);
      if(data && data.data){
        const agentId = data.data.id;
        setAgentId(agentId);
        console.log(agentId)
        return agentId
      }
    } catch(error) {
        console.error(error);
    }
  };

  const receivedSignal = () => {
    handleOpen();
  }

  const getNotes = async (agentId: number) => {
    await getAgentNotes(agentId).then((data) => {
      if(data && data.data) {
        console.log(data.data.content)
        setNotesData(data.data.content)
      }
    }).catch((error) => {
      console.error(error);
    });
  };

  if (!isVisible)
    return (
      <button
        onClick={handleOpen}
        className="bg-teal-100 hover:bg-teal-600 text-teal-900 font-bold py-2 px-4 rounded"
      >
        {bttnTitle}
      </button>
    );

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/[0.3]">
      <div
        className="flex flex-auto flex-col bg-white rounded-3xl shadow-lg p-8"
        style={{
          maxWidth: "900px",
          width: "100%",
          maxHeight: "600px",
          height: "600px",
        }}
      >
        <div className="flex flex-row items-center justify-between mb-3">
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          <div>
            <Button
              baseColor="transparent"
              image="Cross.svg"
              onClick={handleClose}
            />
          </div>
        </div>
        <div className="flex flex-auto flex-row space-x-5">
          <div className="w-60 overflow-clip">
            <div className="flex flex-col w-full place-items-center my-2">
              <div className="flex flex-col place-items-center space-y-3 mb-5">
                <Avatar size="large"></Avatar>
                <Pill title={workspace}></Pill>
              </div>
              <div className="flex flex-col h-full w-full">
                <h4 className="my-3 font-bold text-xl">Agent Details</h4>
                <h4 className="mb-2">{name}</h4>
                <h4 className="text-xs">{email}</h4>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-5 w-full">
            <div className="grid grid-cols-4 space-x-3">
              <DataCard
                title="Call Time"
                content={metrics.avgHandleTime}
                textColor="green"
              ></DataCard>
              <DataCard
                title="After Call Time"
                content={metrics.avgAfterContactWorkTime}
                textColor="red"
              ></DataCard>
              <DataCard
                title="Hold Time"
                content={metrics.avgHoldTime}
                textColor="yellow"
              ></DataCard>
              <DataCard
                title="Abandon Time"
                content={metrics.avgAbandonTime}
                textColor="purple"
              ></DataCard>
            </div>
            <div>
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center justify-between space-x-2">
                  <h2 className="text-xl font-bold">Notes:</h2>
                </div>
                <div>
                  <NoteCard area={workspace} agentId={agentId} metrics={metrics ? metrics : undefined} signalNotesRow={receivedSignal} bttn_color="teal"></NoteCard>
                </div>
              </div>
            </div>
            <div className="flex flex-auto flex-col">
              {/* cambiar para ordenar: title, priority, last update */}
              <div>
                <NotesTable name={name} area={workspace} notesData={notesData} signalToAgentCard={receivedSignal}/>
              </div>
              {/* 1. cambiar con NotesRow, checar si flexea, probar con los placeholders de figma */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;