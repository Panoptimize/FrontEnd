import { cleanup, render, screen, waitFor } from "@testing-library/react";

import React from "react";
import ActionCenter from "../ActionCenter";
import mockAxios from 'jest-mock-axios';
import { getStatus } from "../../../services/status/getStatus";
import {mockStatusCard} from "../../../services/status/_mocks_/statusResults"
jest.mock("../../../services");

// jest.mock('../../../services', () => ({
//     getStatus: jest.fn()
// }));


// jest.mock('../../../services', () => ({
//   getStatus: jest.fn().mockResolvedValue({ error: false }),
// }));

jest.mock('../../../services', () => ({
  getStatus: jest.fn(),
}));
  

// beforeEach(() => {
//     (getStatus as jest.Mock).mockResolvedValue({
//         data: { results: mockStatusCard },
//       });
// });

afterEach(() => {
  cleanup();
});

describe("ActionCenter", () => {

    

  test("The ActionCenter renders correctly", async () => {
    render(<ActionCenter />);
    expect(screen.getByTestId("wrapper-ActionCenter")).toBeTruthy();

  });

    
  test("The Status Card renders correctly", async () => {

    // const mockResponse = {
    //     data: [
    //         { status: 'AGENTS', numUsers: 34 },
    //         { status: 'AGENTS_ONLINE', numUsers: 2 },
    //         { status: 'AGENTS_AVAILABLE', numUsers: 2 },
    //         { status: 'AGENTS_OFFLINE', numUsers: 32 },
    //     ],
    //     status: 200,
    //     statusText: 'OK',
    //     headers: {},
    //     config: {},
    // };

    // mockAxios.get.mockResolvedValueOnce(mockResponse);

    (getStatus as jest.Mock).mockResolvedValue({
      data: mockStatusCard ,
      error: null,
    });


    render(<ActionCenter />);

    await screen.findByTestId('wrapper-ActionCenter');

    //const statusCardHolder = screen.getByTestId('mock-status-card-holder');
    //expect(statusCardHolder).toBeInTheDocument();
    expect(screen.getByText('Agents')).toBeInTheDocument();
    expect(screen.getByText('Online')).toBeInTheDocument();


    //expect(screen.getByTestId("txt-agentStatus")).toHaveTextContent("Agents Status");

    // expect(screen.getByTestId("txt-agentStatus")).toHaveTextContent(" Agents Status ");
    // expect(screen.getByTestId("txt-statudCardHolder")).toBeInTheDocument();

    // await waitFor(() => {
    //     expect(screen.getByText(expectedText)).toBeInTheDocument();
    //   });

  });

});
