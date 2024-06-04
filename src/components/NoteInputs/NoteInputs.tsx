import { INoteInputs } from "./types";
import { Button } from "../Button";
import { ChoiceBox } from "../ChoiceBoxes/ChoiceBox";
import { TextInput } from "../TextInput";
import { useRef, useState } from "react";
import { INote } from "../../pages/types";
import { updateNote } from "../../services/notes/updateNote";
import { TextInputRef } from "../TextInput/types";
import { Priority } from "../../constants/Priority";
import { data } from "autoprefixer";
import { error } from "console";

/* Ahorita se esta simulando lo del backend, ya despues seria con un backend ya implementado */


const NoteInputs: React.FC<INoteInputs> = ({ id, priority, title, text }) => {

  const [editedNote, setEditedNote] = useState<INote>();

  const nameRef = useRef<TextInputRef>(null);
  const descriptionRef = useRef<TextInputRef>(null);

  const createEditNote = () => {
    const name = nameRef.current?.getValue ? nameRef.current.getValue() : "";
    const desc = descriptionRef.current?.getValue ? descriptionRef.current.getValue() : "";

    const updatedNote:INote = {
      name: name ? name : "",
      description: desc ? desc : "",
      priority: Priority.high,
      solved: false,
    }

    {id && (
      editNote(id, updatedNote))}
  }

  const editNote = async (id: number, editedNote: INote) => {
    await updateNote(editedNote, id).then((data) => {
    }).catch((error) => {
      console.error(error)
    });
  };

  return (
    <div className="flex flex-auto flex-col w-full h-full p-2 space-y-4">
      <div className="flex flex-row space-x-2">
        <div className="w-full">
          <TextInput
            placeholder="Add Title"
            size="small"
            text={title}
            ref = {nameRef}
          ></TextInput>
        </div>
        <ChoiceBox
          boxText="Priority:"
          options={[
            { value: "low", label: "Low" },
            { value: "medium", label: "Medium" },
            { value: "high", label: "High" },
          ]}
          chosen = {priority}
        ></ChoiceBox>
      </div>
      <div className="h-full">
        <TextInput placeholder="Add Text" size="big" text={text}></TextInput>
      </div>
      <div className="grid grid-cols-3">
        <div></div>
        <div></div>
        <div className="grid grid-cols-2 space-x-4">
          {title ? (
    <Button baseColor="rose" image="Cross.svg" text="Delete"></Button>
) : (<div></div>)}         
          <Button baseColor="teal" image="Download.svg" text="Save"></Button>
        </div>
      </div>
    </div>
  );
};

export default NoteInputs;
