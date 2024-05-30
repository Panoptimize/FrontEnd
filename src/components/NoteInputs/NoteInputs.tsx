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
            { value: "option1", label: "1" },
            { value: "option2", label: "2" },
            { value: "option3", label: "3" },
            { value: "option4", label: "4" },
            { value: "option5", label: "5" },
          ]}
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
