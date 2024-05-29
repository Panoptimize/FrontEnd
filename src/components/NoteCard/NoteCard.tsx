import React, { useState } from "react";
import { INoteCard } from "./types";
import { Button } from "../Button";
import { Avatar } from "../Avatar";
import { Pill } from "../Pill";
import { DataCard } from "../DataCard";
import { ChoiceBox } from "../ChoiceBoxes/ChoiceBox";
import { TextInput } from "../TextInput";

const NoteCard: React.FC<INoteCard> = ({
  bttnTitle = "Add note",
  title = "Contact Note",
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
      <Button
        baseColor="teal"
        image="Edit.svg"
        text={bttnTitle}
        onClick={handleOpen}
      ></Button>
    );

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div
        className="flex flex-auto flex-col bg-white rounded-3xl  p-8"
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
                <h4>Metric1</h4>
                <h4>Metric2</h4>
                <h4>Metric3</h4>
              </div>
            </div>
          </div>
          <div className="flex flex-auto flex-col w-full h-full p-2 space-y-4">
            <div className="flex flex-row space-x-2">
              <div className="w-full">
                <TextInput placeholder="Add Title" size="small"></TextInput>
              </div>
              <ChoiceBox
                boxText="Priority:"
                options={[
                  { value: "option1", label: "1" },
                  { value: "option2", label: "2" },
                  { value: "option3", label: "3" },
                  { value: "option4", label: "4" },
                  { value: "option5", label: "5" },
                ]}
              ></ChoiceBox>
            </div>
            <div className="h-full">
              <TextInput placeholder="Add Text" size="big"></TextInput>
            </div>
            <div className="grid grid-cols-3">
              <div></div>
              <div></div>
              <div className="flex flex-row space-x-4">
                <Button
                  baseColor="rose"
                  image="Cross.svg"
                  text="Delete"
                ></Button>
                <Button
                  baseColor="teal"
                  image="Download.svg"
                  text="Save"
                ></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
