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
import { ChoiceBoxRef } from "../ChoiceBoxes/ChoiceBox/types";

/* Ahorita se esta simulando lo del backend, ya despues seria con un backend ya implementado */


const NoteInputs: React.FC<INoteInputs> = ({ id, priority, title, text }) => {

  const [editedNote, setEditedNote] = useState<INote>();

  const nameRef = useRef<TextInputRef>(null);
  const descriptionRef = useRef<TextInputRef>(null);
  const priorityRef = useRef<ChoiceBoxRef>(null);

  const createEditNote = () => {
    console.log("ENTRA A ESTE METODO")
    console.log(nameRef.current?.getValue())
    console.log(descriptionRef.current?.getValue())
    console.log(priorityRef.current?.getValue())
    
    const name = nameRef.current?.getValue ? nameRef.current.getValue() : "";
    const desc = descriptionRef.current?.getValue ? descriptionRef.current.getValue() : "";
    const priority = priorityRef.current?.getValue ? priorityRef.current.getValue() : Priority.low;

    const updatedNote:INote = {
      name: name ? name : "",
      description: desc ? desc : "",
      priority: priority,
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

  const checkInputs =() => {
    console.log("ENTRA A ESTE METODO")
    console.log(nameRef.current?.getValue())
    console.log(descriptionRef.current?.getValue())
    console.log(priorityRef.current?.getValue())
  }

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
          ref = {priorityRef}
        ></ChoiceBox>
      </div>
      <div className="h-full">
        <TextInput placeholder="Add Text" size="big" text={text} ref={descriptionRef}></TextInput>
      </div>
      <div className="grid grid-cols-3">
        <div></div>
        <div></div>
        <div className="flex flex-row space-x-4">
          <Button baseColor="rose" image="Cross.svg" text="Delete"></Button>
          <Button baseColor="teal" image="Download.svg" text="Save" onClick={createEditNote}></Button>
        </div>
      </div>
    </div>
  );
};

export default NoteInputs;
