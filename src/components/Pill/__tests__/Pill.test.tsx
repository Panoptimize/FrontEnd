import { screen, render, cleanup } from "@testing-library/react";
import Pill from "../Pill";
import { IPill } from "../types";

afterEach(() => {
    cleanup();
  });


  describe("Pill Component", () => {

    const renderComponent = (props: IPill) =>
        render(
          <table>
            <tbody>
              <Pill {...props} data-testid="pill"/>
            </tbody>
          </table>,
        );

        const props: IPill = {
            title: "Cancel",
            icon:"Cross.png",
          };


          test("Renders without crashing", () => {
            renderComponent(props);
            // Check if the pill contains an SVG element
            expect(screen.queryByTestId("img-pill")).not.toBeInTheDocument();
          });
  });