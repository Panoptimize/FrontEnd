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
            currentTime: '00:04:15',
            agentImage: 'https://randomuser.me/api/portraits/women/48.jpg',
            name: 'Olivia',
            status: 'Online',
            agentId: '12345-67890-ABCD',
            temperature: 'Low',
            channel: 'Voice',
        },
        {
            currentTime: '00:04:15',
            agentImage: 'https://randomuser.me/api/portraits/women/48.jpg',
            name: 'Olivia',
            status: 'Online',
            agentId: '12345-67890-ABCD', // Ejemplo de ID alfanumérico de 15 caracteres
            temperature: 'High',
            channel: 'Voice',
        },
    ],
};