import React from 'react';
import Topbar from "./Topbar";


// Export
export default {
    title: 'Components/Topbar',
    component: Topbar,
    argTypes: {
        name: {
            control: { type: 'text' }
        },
        fullName: {
            control: { type: 'text' }
        },
        email: {
            control: { type: 'text' }
        },
        numberOfNotifications: {
            control: { type: 'number' }
        },
        img: {
            control: { type: 'file', accept: '.png'}
        }
    },
    tags: ["autodocs"],
};
  
// Variante con diferentes valores de integer para variant
export const Topbar1 = (args) => <Topbar {...args} />;
Topbar1.args = {
    name: 'Klaus',
    fullName: 'Klaus Cedillo',
    email: 'klausmcedillo@gmail.com',
    numberOfNotifications: 1,
};