import { INoteInputs } from "./types";
import { Button } from "../Button";
import { ChoiceBox } from "../ChoiceBoxes/ChoiceBox";
import { TextInput } from "../TextInput";
import { useEffect, useRef, useState } from "react";
import { IAgentPerformanceData, ICreateNote, INote } from "../../pages/types";
import { updateNote } from "../../services/notes/updateNote";
import { TextInputRef } from "../TextInput/types";
import { Priority } from "../../constants/Priority";
import { ChoiceBoxRef } from "../ChoiceBoxes/ChoiceBox/types";
import { deleteNote } from "../../services/notes/deleteNote";
import { createNote } from "../../services/notes/createNote";
import { getAgentMetrics } from "../../services/AgentMetrics/getAgentMetrics";

/* Ahorita se esta simulando lo del backend, ya despues seria con un backend ya implementado */


const NoteInputs: React.FC<INoteInputs> = ({ id, agentId, metrics, priority, title, text, closeWindow }) => {

  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isTooLong, setIsTooLong] = useState<boolean>(false);

  const nameRef = useRef<TextInputRef>(null);
  const descriptionRef = useRef<TextInputRef>(null);
  const priorityRef = useRef<ChoiceBoxRef>(null);

  const createEditNote = () => {
    const name = nameRef.current?.getValue ? nameRef.current.getValue() : "";
    const desc = descriptionRef.current?.getValue ? descriptionRef.current.getValue() : "";
    const priority = priorityRef.current?.getValue ? priorityRef.current.getValue() : Priority.LOW;

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
    const nameValue = nameRef.current?.getValue() ?? "";
    if(nameValue === ""){
      setIsEmpty(true);
    } else if(nameValue.length > 20) {
      setIsTooLong(true);
    } else {
      setIsEmpty(false);
      setIsTooLong(false);
      await updateNote(editedNote, id).then((data) => {
        if(closeWindow)
          closeWindow();
      }).catch((error) => {
        console.error(error)
      });
    }
  };

  const deleteCurrentNote = () => {
    {id && (
      eraseNote(id)
    )}
  };

  const eraseNote = async(id: number) => {
    await deleteNote(id).then((data) => {
      if(closeWindow){
        closeWindow();
      }
    }).catch((error) => {
      console.error(error)
    });
  };

  const creatingNote = async () => {
    const nameValue = nameRef.current?.getValue() ?? "";
    if(nameValue === ""){
      setIsEmpty(true);
    } else if(nameValue.length > 20) {
      setIsTooLong(true);
    }
    else{
      if(metrics && agentId){
        setIsEmpty(false);
        setIsTooLong(false);
        const newNote:INote = {
          name: nameRef.current?.getValue() || "",
          description: descriptionRef.current?.getValue() || "",
          priority: priorityRef.current?.getValue() || Priority.LOW,
          solved: false,
        }
        const newAgentPerformance: IAgentPerformanceData = {
          avgAbandonTime: metrics.avgAbandonTime,
          avgAfterContactWorkTime: metrics.avgAfterContactWorkTime,
          avgHandleTime: metrics.avgHandleTime,
          avgHoldTime: metrics.avgHoldTime,
          id: agentId
        };
        const noteToCreate:ICreateNote = {
          createNote:newNote,
          createAgentPerformance:newAgentPerformance
        }
        await createNote(noteToCreate).then((data) => {
          if(closeWindow){
            closeWindow();
          }
        }).catch((error) => {
          console.error(error)
        })
      }
    }
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
            { value: "LOW", label: "Low" },
            { value: "MEDIUM", label: "Medium" },
            { value: "HIGH", label: "High" },
          ]}
          chosen = {priority}
          ref = {priorityRef}
        ></ChoiceBox>
      </div>
      <div className="h-full">
        <TextInput placeholder="Add Text" size="big" text={text} ref={descriptionRef}></TextInput>
      </div>
      <div className="grid grid-cols-3">
        {isEmpty || isTooLong ? (<div className="p-2 text-red-600 font-bold"> {isEmpty ? "PLEASE ADD A TITLE" : "TITLE IS TOO LONG"} !!! </div>
        ):(<div></div>)}
        <div></div>
        <div className="grid grid-cols-2 space-x-4">
          {id ? (
    <Button baseColor="rose" image="Cross.svg" text="Delete" onClick={deleteCurrentNote}></Button>
) : (<div></div>)}         
          <Button baseColor="teal" image="Download.svg" text="Save" onClick={id ? createEditNote : creatingNote}></Button>

        </div>
      </div>
    </div>
  );
};

export default NoteInputs;
