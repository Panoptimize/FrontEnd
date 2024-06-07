import { act, cleanup, render, screen, waitFor } from "@testing-library/react";

import React from "react";
import ActionCenter from "../ActionCenter";
import mockAxios from 'jest-mock-axios';
import { getStatus } from "../../../services";
import {mockStatusCard} from "../../../services/status/_mocks_/statusResults"
jest.mock("../../../services");

// jest.mock('../../../services', () => ({
//     getStatus: jest.fn()
// }));


// jest.mock('../../../services', () => ({
//   getStatus: jest.fn().mockResolvedValue({ error: false }),
// }));

/* jest.mock('../../../services/status/getStatus.ts', () => ({
  (getStatus as jest.Mock).mockResolvedValue({
    data: mockStatusCard,
    error: null,
  }),
})); */
  

// beforeEach(() => {
//     (getStatus as jest.Mock).mockResolvedValue({
//         data: { results: mockStatusCard },
//       });
// });

beforeEach(() => {
  cleanup();
});

describe("ActionCenter", () => {

  test("The ActionCenter renders correctly", async () => {
    render(<ActionCenter />);
    expect(screen.getByTestId("wrapper-ActionCenter")).toBeTruthy();

  });

    
  test("The Status Card renders correctly", async () => {
    (getStatus as jest.Mock).mockResolvedValue(
      {
        data: mockStatusCard, error: null 
      });

    render(<ActionCenter />);


    //const statusCardHolder = screen.getByTestId('mock-status-card-holder');
    //expect(statusCardHolder).toBeInTheDocument();

    await waitFor(() => {
      screen.findByTestId('wrapper-ActionCenter');
      
    });

    


    //expect(screen.getByTestId("txt-agentStatus")).toHaveTextContent("Agents Status");

    // expect(screen.getByTestId("txt-agentStatus")).toHaveTextContent(" Agents Status ");
    // expect(screen.getByTestId("txt-statudCardHolder")).toBeInTheDocument();

    // await waitFor(() => {
    //     expect(screen.getByText(expectedText)).toBeInTheDocument();
    //   });

  });

});
