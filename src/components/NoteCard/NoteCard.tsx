import React, { useState } from "react";
import { INoteCard } from "./types";
import { Button } from "../Button";
import { Avatar } from "../Avatar";
import { Pill } from "../Pill";
import { ChoiceBox } from "../ChoiceBoxes/ChoiceBox";
import { TextInput } from "../TextInput";
import { NoteInputs } from "../NoteInputs";

const NoteCard: React.FC<INoteCard> = ({
  bttnTitle = "Add note",
  title,
  text,
  priority,
  id,
  name = "Dave",
  email = "dave_chapelle@gmail.com",
  username = "chap",
  selectedWorkspaces: initialSelectedWorkspaces = [],
  availableWorkspaces: initialAvailableWorkspaces = ["Sales", "Payments"],
  profileImage,
  bttn_color = "transparent",
  signalNotesRow,
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
    console.log("Signal received from NoteInputs");
    sendSignalToRow();
    setIsVisible(false);
  };

  const handleOpen = () => {
    setIsVisible(true);
  };

  const sendSignalToRow = () => {
    if(signalNotesRow){
      signalNotesRow();
    }
  }

  if (!isVisible)
    return (
      <Button
        baseColor={bttn_color}
        text={bttnTitle}
        onClick={handleOpen}
      ></Button>
    );

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/[0.3]">
      <div
        className="flex flex-auto flex-col bg-white rounded-3xl p-8"
        style={{
          maxWidth: "900px",
          width: "100%",
          maxHeight: "600px",
          height: "600px",
        }}
      >
        <div className="flex flex-row items-center justify-between mb-3">
          <h2 className="text-3xl font-bold mb-2">Contact Note</h2>
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
          <NoteInputs
            id={id}
            title={title}
            text={text}
            priority={priority}
            closeWindow={handleClose}
          ></NoteInputs>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
