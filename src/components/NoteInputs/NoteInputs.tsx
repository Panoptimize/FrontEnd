import { INoteInputs } from "./types";
import { Button } from "../Button";
import { ChoiceBox } from "../ChoiceBoxes/ChoiceBox";
import { TextInput } from "../TextInput";

/* Ahorita se esta simulando lo del backend, ya despues seria con un backend ya implementado */


const NoteInputs: React.FC<INoteInputs> = ({ priority, title, text }) => {
  return (
    <div className="flex flex-auto flex-col w-full h-full p-2 space-y-4">
      <div className="flex flex-row space-x-2">
        <div className="w-full">
          <TextInput
            placeholder="Add Title"
            size="small"
            text={title}
          ></TextInput>
        </div>
        <ChoiceBox
          boxText="Priority:"
          options={[
            { value: "Low", label: "Low" },
            { value: "Medium", label: "Medium" },
            { value: "High", label: "High" },
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
        <div className="flex flex-row space-x-4">
          <Button baseColor="rose" image="Cross.svg" text="Delete"></Button>
          <Button baseColor="teal" image="Download.svg" text="Save"></Button>
        </div>
      </div>
    </div>
  );
};

export default NoteInputs;
