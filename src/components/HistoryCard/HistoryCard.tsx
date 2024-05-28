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
          <div className="flex flex-auto bg-white">
            <div className="grid grid-rows-3 place-items-center space-y-5">
              <Avatar size="large"></Avatar>
              <div className="flex flex-auto flex-col my-3">
                <h4 className="my-3 font-bold text-xl">Agent Details</h4>
                <h4>{name}</h4>
                <h4>{email}</h4>
                <h4>{username}</h4>
              </div>
              <Pill title="Areas"></Pill>
              <div></div>
            </div>
          </div>
          <div className=" flex flex-auto ">
            <div className="flex flex-col space-y-5">
              <div className="grid grid-rows-2 space-y-3">
                <div className="grid grid-cols-4 space-x-3">
                  <DataCard
                    title="Call Time"
                    content={20}
                    textColor="green"
                  ></DataCard>
                  <DataCard
                    title="After Call Work Time"
                    content={"asdf"}
                    textColor="red"
                  ></DataCard>
                  <DataCard
                    title="Answer Speed"
                    content={"aasf"}
                    textColor="yellow"
                  ></DataCard>
                  <DataCard
                    title="Status"
                    content={10}
                    textColor="purple"
                  ></DataCard>
                </div>
                <div className="grid grid-cols-4 space-x-3">
                  <DataCard
                    title="Date"
                    content={10}
                    textColor="blue"
                  ></DataCard>
                  <DataCard title="Time of Day" content={10}></DataCard>
                  <DataCard title="Satisfaction" content={10}></DataCard>
                  <DataCard title="First Contact" content={10}></DataCard>
                </div>
              </div>
              <h5 className="my-3 font-bold text-xl">Insights</h5>
              <div className="overflow-y-scroll p-2 h-36 flex-auto  rounded-md border-2 my-2">
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

export default HistoryCard;
