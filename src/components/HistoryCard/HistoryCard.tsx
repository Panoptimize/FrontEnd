import React, { useState } from "react";
import { IHistoryCard } from "./types";
import { Button } from "../Button";
import { Avatar } from "../Avatar";
import { Pill } from "../Pill";
import { DataCard } from "../DataCard";

const HistoryCard: React.FC<IHistoryCard> = ({
  bttnTitle = "View Details",
  title = "Contact Details",
  name = "Dave",
  email = "dave_chapelle@gmail",
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
        className="bg-white rounded-3xl shadow-lg p-8 mx-auto"
        style={{ maxWidth: "900px", width: "100%" }}
      >
        <div className="flex flex-auto">
          <h2 className="text-3xl font-bold mb-5">{title}</h2>
        </div>
        <div className="flex flex-row flex-auto space-x-5">
          <div className="flex flex-col flex-auto space-y-5 min-w-32 mr-3">
            <Avatar size="large"></Avatar>
            <div className="flex flex-auto flex-col">
              <h4 className="my-3 font-bold text-xl">Agent Details</h4>
              <h4>{name}</h4>
              <h4>{email}</h4>
              <h4>{username}</h4>
            </div>
            <div className="flex flex-row space-x-2">
              <Pill title="Areas"></Pill>
              <Pill title="Areas"></Pill>
            </div>
          </div>
          <div className="flex flex-auto flex-col space-y-3">
            <div className="flex flex-row space-x-3">
              <DataCard
                title="Call Time"
                content={1000000000000}
                textColor="green"
              ></DataCard>
              <DataCard
                title="After Call Work Time"
                content={"asdf"}
                textColor="red"
              ></DataCard>
              <DataCard
                title="Answer Speed"
                content={"aasf asdf asd asdf"}
                textColor="yellow"
              ></DataCard>
              <DataCard
                title="Status"
                content={10}
                textColor="purple"
              ></DataCard>
            </div>
            <div className="flex flex-row space-x-3">
              <DataCard title="Date" content={10} textColor="blue"></DataCard>
              <DataCard title="Time of Day" content={10}></DataCard>
              <DataCard title="Satisfaction" content={10}></DataCard>
              <DataCard title="First Contact" content={10}></DataCard>
            </div>
            <div className="flex flex-auto bg-yellow-100">Insights</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
