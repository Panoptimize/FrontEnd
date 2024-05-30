import React, { useState } from "react";
import { IAgentCard } from "./types";
import { Button } from "../Button";
import { Avatar } from "../Avatar";
import { Pill } from "../Pill";
import { DataCard } from "../DataCard";
import { ChoiceBox } from "../ChoiceBoxes/ChoiceBox";
import { NotesRow } from "../NotesRow";
import NoteCard from "../NoteCard/NoteCard";
import { NotesTable } from "../NotesTable";

const AgentCard: React.FC<IAgentCard> = ({
  bttnTitle = "View Details",
  title = "Contact Details",
  name = "Dave",
  email = "dave_chapelle@gmail.com",
  username = "chap",
  selectedWorkspaces: initialSelectedWorkspaces = [],
  availableWorkspaces: initialAvailableWorkspaces = ["Sales", "Payments"],
  profileImage,
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

  const handleOpen = () => {
    setIsVisible(true);
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

  const notesData = [
    { title: "Attend better your clients", priority: "1", updateDate: "24/05/2024" },
    { title: "There was an incident, please dont yell harsh words at the clients.", priority: "2", updateDate: "20/05/2024" },
    { title: "Recieve better", priority: "3", updateDate: "10/05/2024" },
    { title: "Slow attendance rate", priority: "1", updateDate: "2024/05/30" },
    { title: "Bad work environment", priority: "2", updateDate: "2024/05/29" },
    { title: "Respond more nicely", priority: "3", updateDate: "2024/05/28" },
  ];

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
