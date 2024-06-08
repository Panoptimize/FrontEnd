import {screen,render,cleanup} from "@testing-library/react";
import ChoiceBox from "../ChoiceBox";
import { ChoiceBoxRef, IChoiceBox } from "../types";
import { Priority } from "../../../../constants/Priority";

afterEach(() => {
    cleanup();
}) ;

describe ("Choice Box Component", () => {
    const renderComponent = (props: IChoiceBox) => render (
        <table>
            <tbody>
                <ChoiceBox {...props}></ChoiceBox>
            </tbody>
        </table>,
    );

    
    const props: IChoiceBox = {
        boxText:"Select your workspace",
        options: [ {value: "option1", label: "Option 1" },{ value: "option2", label: "Option 2" }, { value: "option3", label: "Option 3" },],
        chosen: "option1"
    };

    test("Renders with no crashes", () => {
        renderComponent(props);
    });


});
