import React, { useState } from "react";
import { IAgentCard } from "./types";
import { Button } from "../Button";
import { Avatar } from "../Avatar";
import { Pill } from "../Pill";
import { DataCard } from "../DataCard";
import { ChoiceBox } from "../ChoiceBoxes/ChoiceBox";
import NoteCard from "../NoteCard/NoteCard";

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
                  <NoteCard></NoteCard>
                </div>
              </div>
            </div>
            <div className="flex flex-auto flex-col">
              <div className="flex flex-row items-center justify-between">
                <h1 className="ml-3 font-bold">Title</h1>
                <div className="flex flex-row space-x-10 mr-24">
                  <h1 className="ml-3 font-bold">Priority</h1>
                  <h1 className="ml-3 font-bold">Last Update</h1>
                </div>
              </div>
              <div className="overflow-y-scroll p-2 flex-auto h-36 rounded-md border-2 my-2">
                <div>Insight 1</div>
                <div>Insight 1</div>
                <div>Insight 1</div>
                <div>Insight 1</div>
                <div>Insight 1</div>
                <div>Insight 1</div>
                <div>Insight 1</div>
                <div>Insight 1</div>
                <div>Insight 1</div>
                <div>Insight 1</div>
                <div>Insight 1</div>
                <div>Insight 1</div>
                <div>Insight 1</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
