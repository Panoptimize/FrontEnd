import React, { useState } from "react";
import { IAgentCard, INotesRow } from "./types";
import { Button } from "../Button";
import { Avatar } from "../Avatar";
import { Pill } from "../Pill";
import { DataCard } from "../DataCard";
import { ChoiceBox } from "../ChoiceBoxes/ChoiceBox";
import { NotesRow } from "../NotesRow";
import NoteCard from "../NoteCard/NoteCard";
import { NotesTable } from "../NotesTable";
import { INoteCard } from "../NoteCard/types";
import { INotesTable } from "../NotesTable/types";
import { getAgentNotes } from "../../services/notes/getAgentNotes";
import { INoteData } from "../../pages/types";
import { getAgentId } from "../../services/agentsList/getAgentId";

const AgentCard: React.FC<IAgentCard> = ({
  bttnTitle = "View Details", //recibe nombre, email, username. Faltan metricas y como jalar 	Workspace	Last Activity y agent id	desde BE (Agent Row)
  title = "Contact Details",
  name = "Dave",
  email = "dave_chapelle@gmail.com",
  username = "chap",
  selectedWorkspaces: initialSelectedWorkspaces = [],
  availableWorkspaces: initialAvailableWorkspaces = ["Sales", "Payments"],
  profileImage,
  id,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
  });

  const [selectedWorkspaces, setSelectedWorkspaces] = useState<string[]>(
    initialSelectedWorkspaces || []
  );
  const [availableWorkspaces, setAvailableWorkspaces] = useState<string[]>(
    initialAvailableWorkspaces || []
  );

  const [notesData, setNotesData] = useState<INoteData[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectWorkspace = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newWorkspace = e.target.value;
    if (!selectedWorkspaces.includes(newWorkspace)) {
      setSelectedWorkspaces((prev) => [...prev, newWorkspace]);
    }
  };

  const handleRemoveWorkspace = (workspaceToRemove: string) => {
    setSelectedWorkspaces((prev) =>
      prev.filter((ws) => ws !== workspaceToRemove)
    );
  };

  const handleSave = () => {
    console.log("Guardando datos:", formData, selectedWorkspaces);
    setIsVisible(false); // Cerrar el modal después de guardar
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleOpen = async () => {
    setIsVisible(true);
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
        console.log(agentId)
        return agentId
      }
    } catch(error) {
        console.error(error);
    }
  };

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

    /*
    const notesData: INotesRow[] = [
      {
        id: 1,
        title: "Attend better your clients",
        priority: 'High',
        updateDate: "24/05/2024",
        description: "Please attend your clients in a more efficient and polite way.",
      },
      {
        id: 2,
        title: "There was an incident, please dont yell harsh words at the clients.",
        priority: 'Low',
        updateDate: "20/05/2024",
        description: "This is unacceptable. You screamed an F-bomb to a client, we will talk to head management to see what proceeds with your employment rights.",
      },
      { 
        id: 3,
        title: "Recieve better", 
        priority: 'High', 
        updateDate: "10/05/2024",
        description: "Recieve your clients better",
      },
      { 
        id: 4,  
        title: "Slow attendance rate", 
        priority: 'Low', 
        updateDate: "30/05/2024",
        description: "Attend your calls faster, don't procastinate.",
      },
      {
        id: 5, 
        title: "Bad work environment", 
        priority: 'Low', 
        updateDate: "10/05/2024",
        description: "We have recieved testimonies from some of your coworkers that your anger problems lead to you lashing out and screaming at your coworkers. This tenses up the work environment, please try to get some anger management sessions with HR.",
      },
      { 
        id: 6,
        title: "Respond more nicely", 
        priority: 'Medium', 
        updateDate: "20/04/2024",
        description: "We need you to respond in a more comfortable and polite way to your clients.",
      },
    ];*/
    

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
                <Pill title="Areas"></Pill>
              </div>
              <div className="flex flex-col h-full w-full">
                <h4 className="my-3 font-bold text-xl">Agent Metrics</h4>
                <h4>{name}</h4>
                <h4>{email}</h4>
                <h4>{username}</h4>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-5 w-full">
            <div className="grid grid-cols-4 space-x-3">
              <DataCard
                title="Call Time"
                content={20}
                textColor="green"
              ></DataCard>
              <DataCard
                title="After Call Time"
                content={"asdf"}
                textColor="red"
              ></DataCard>
              <DataCard
                title="Hold Time"
                content={"aasf"}
                textColor="yellow"
              ></DataCard>
              <DataCard
                title="Abandon Time"
                content={10}
                textColor="purple"
              ></DataCard>
            </div>
            <div>
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center justify-between space-x-2">
                  <h2 className="text-xl font-bold">Notes:</h2>
                </div>
                <div>
                  <NoteCard bttn_color="teal"></NoteCard>
                </div>
              </div>
            </div>
            <div className="flex flex-auto flex-col">
              {/* cambiar para ordenar: title, priority, last update */}
              <div>
                <NotesTable notesData={notesData} />
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
