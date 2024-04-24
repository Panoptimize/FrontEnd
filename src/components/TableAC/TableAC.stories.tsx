import { Meta, StoryFn } from '@storybook/react';
import TableAC from './TableAC'; // Importar el componente
import { ITableAC } from './types'; // Importar el tipo para el story
import React from 'react';

const meta: Meta = {
    title: 'Components/TableAC', // Título para Storybook
    component: TableAC, // Componente a mostrar
    parameters: {
        layout: 'centered', // Configuración de diseño para Storybook
        docs: {
            story: {
                inline: false, // Si el story se muestra en línea o en iframe
                description: 'Table component for agent call information', // Descripción del story
                iframeHeight: 400, // Altura del iframe para Storybook
            },
        },
    },
    argTypes: {
        rows: { control: { type: "object"}}, // Configuración para controlar el tipo de argumento
    },
    tags: ['autodocs'], // Etiquetas para Storybook
};

export default meta; // Exportar el meta para Storybook

const Template: StoryFn<ITableAC> = (args) => <TableAC {...args} />; // Definir la plantilla

// Definir un story predeterminado
export const Default = Template.bind({});
Default.args = {
    rows: [
        {
            callstatus: '00:04:15',
            agentImage: 'https://randomuser.me/api/portraits/women/48.jpg',
            name: 'Olivia',
            status: 'Online',
            workspace1: 'Sales',
            workspace2: 'Delivery',
            workHours: '04:32:13',
            alarm: true,
        },
        {
            callstatus: '00:10:22',
            agentImage: 'https://randomuser.me/api/portraits/men/32.jpg',
            name: 'John',
            status: 'Offline',
            workspace1: 'Support',
            workspace2: 'Development',
            workHours: '03:21:44',
            alarm: false,
        },
    ],
};