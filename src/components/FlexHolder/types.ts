import React, { ReactNode } from 'react';


export interface IFlexHolder {
    components: ReactNode[]; //Los componentes que tendra dentro del holder
    border?: Boolean; //True si quieres borde, falso/nada si no quieres borde 
}