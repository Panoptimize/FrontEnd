import { Title } from 'chart.js';
import { INotesTable, INotesRow } from '../../components/NotesTable/types';
import httpInstance from "../httpInstance";

export const getNotes = async (): Promise <INotesTable> => {
    try {
        const endpoint = '/note/';
        const response = await httpInstance.get(endpoint);
        console.log('Response data:', response.data);  

        return response.data


        } catch (error){
            throw error;
        }
} 

//Checar con ERNO 


interface INotesData {
    NotesResult: Array<{
        Note: INotesRow[]
    }>;
}