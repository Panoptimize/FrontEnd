import { cleanup, render, screen, waitFor } from "@testing-library/react";

import React from "react";
import ActionCenter from "../ActionCenter";
import mockAxios from 'jest-mock-axios';
import { getStatus } from "../../../services/status/getStatus";
import {mockStatusCard} from "../../../services/status/_mocks_/statusResults"
//jest.mock("../../../services");

// jest.mock('../../../services', () => ({
//     getStatus: jest.fn()
// }));


// jest.mock('../../../services', () => ({
//   getStatus: jest.fn().mockResolvedValue({ error: false }),
// }));

// jest.mock('../../../services', () => ({
//   getStatus: jest.fn(),
// }));


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

    

});
