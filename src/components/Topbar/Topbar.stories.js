import React from 'react';
import Topbar from "./Topbar";

// Export
export default {
    title: 'Topbar',
    component: Topbar,
    argTypes: {
        variant: {
            control: { type: 'number' } // Control de tipo número para cambiar valores de variant
        }
    }
};
  
// Variante con diferentes valores de integer para variant
export const Topbar1 = (args) => <Topbar {...args} />;
Topbar1.args = {
    variant: 1 // Valor por defecto para variant
};