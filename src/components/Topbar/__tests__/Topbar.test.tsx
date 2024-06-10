import React from 'react';
import { render, fireEvent, screen, act , getByTestId, waitFor } from '@testing-library/react';
import Topbar from '../Topbar';
import { BrowserRouter as Router } from "react-router-dom";
import { AppContextProvider } from "../../../store/app-context/app-context";
import { Notification } from "../types";
import userEvent from '@testing-library/user-event'; // If needed
import { renderHook } from '@testing-library/react';
import { getAuthUser } from '../../../services/getAuth/getAuthUser';


describe("Topbar component", () =>{

    interface TopbarProps {
        toggleSidebar: () => void;
        notifications: Notification[];
        unreadCount: number;
    }

    const renderTopbarComponent = (props: TopbarProps) =>
        render(
            <Router>
                <AppContextProvider>
                    <Topbar {...props}/>
                </AppContextProvider>
            </Router>
        );


    const toggleSidebar = () => {
        return    };

    const props: TopbarProps = {
        toggleSidebar: toggleSidebar, 
        notifications: [{"agentName":"Klaus","timestamp":"19900302083000"}], 
        unreadCount: 1
    };

    jest.mock("../../../services/getAuth/getAuthUser", () => ({
        getAuthUser: jest.fn().mockResolvedValue({
          fullName: 'Klaus Cedillo',
          email: 'klauscedilloa@example.com',
        }),
    }));


    it("Renders the component with default props", () =>{

        renderTopbarComponent(props);

        // React.useState = jest.fn().mockReturnValue([notifications, {}]).mockReturnValue([true, {}]).mockReturnValue([0, {}])

        const welcome = screen.getByTestId('welcome-message');
        console.log(welcome);
        
        expect(welcome).toBeInTheDocument();
    });

    it("Renders buttons correctly",() =>{
        renderTopbarComponent(props);
        expect(screen.getByTestId('toggle-unread-notifications')).toBeInTheDocument();
        expect(screen.getByTestId('unread-counter')).toBeInTheDocument();

    });

    it("Removes notifications" ,() =>{
        renderTopbarComponent(props);
        fireEvent.click(screen.getByTestId('toggle-unread-notifications'));
        expect(screen.getByTestId('unread-counter').classList).toContain("hidden");
    })

    it("Handles notifications correctly",() =>{
        renderTopbarComponent(props);
        // expect(screen.getByTestId('notification-test')).not.toBeVisible();
        fireEvent.click(screen.getByTestId('toggle-unread-notifications'));
        expect(screen.getByTestId('notification-test')).toBeInTheDocument();
        expect(screen.getByTestId('notification-test')).toBeVisible();
        fireEvent.click(screen.getByTestId('notification-test'));
        expect(global.window.location.pathname).toContain('/');

    });

    it("Clears notifications" ,() =>{
        renderTopbarComponent(props);
        fireEvent.click(screen.getByTestId('toggle-unread-notifications'));

        const notification = screen.getByTestId('notification-test')

        expect(notification).toBeInTheDocument();
        fireEvent.click(screen.getByTestId('notification-clear-test'));
        expect(notification).not.toBeInTheDocument();
    })
    

    it("Fetches users correctly", async() =>{
        // // fetch.mockImplementationOnce(() => Promise.reject("API is down"));

        const { getByText } = render(<Topbar 
                                        toggleSidebar={toggleSidebar}
                                        notifications={[{"agentName":"Klaus","timestamp":"19900302083000"}]}
                                        unreadCount={1}/>
                                    );
        
        await waitFor(() => {
            expect(screen.getByTestId('email-test')).toBeInTheDocument();
            
        });
        

    });

    it("Fetches users correctly", async() =>{
        // // fetch.mockImplementationOnce(() => Promise.reject("API is down"));

        act(() => render(<Topbar 
            toggleSidebar={toggleSidebar}
            notifications={[{"agentName":"Klaus","timestamp":"19900302083000"}]}
            unreadCount={1}/>));

        // // Assert that the state is updated correctly
        // expect(result.current.name).toBe('Klaus Cedillo');
        // expect(result.current.email).toBe('klauscedilloa@example.com');
        // expect(result.current.firstName).toBe('Klaus');
        
        expect(screen.getByTestId("email-test")).toBeInTheDocument();

        });
});