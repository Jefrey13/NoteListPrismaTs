"use client"
import {createContext, useState, useContext} from 'react'
import {CreatedNote } from '@/interfaces/conteContext';
import {Note} from '@prisma/client'

//Le quite el export por que ya no es necesario exportarlo, puesto qe hemos creado un hook para que realice esto.
export const NoteContext = createContext<{
    notes: Note[];
    loadNotes: () => Promise<void>;
    createNote: (note: CreatedNote) => Promise<void>;
    deleteNote: (id: number) => Promise<void>;
}>({

    notes: [],
    loadNotes: async () =>{},
    createNote: async (note: CreatedNote) => {},
    deleteNote: async(id: number) => {},
});
//Lo anterior es solo para que cumple ts

//Creando nuestro hook, que lo ejecute el contexto. Lo que evita tener que tengamos que exportar el contexto y el useContext en cada archivo.
export const useNotes = ()=>{
    const context = useContext(NoteContext);
    //Si no exite un contexto, quiere decir que no estamos dentro de un provider, pero si existe que lo devuelva
    if(!context){
        throw new Error('useNotes must be used within a NotesProvider');
    }
    return context;
}

export const NotesProvider = ({children}: {children: React.ReactNode})=>{

    //OJO👀. Necesitamos funciones a las cuales podamos acceder luego, por lo que creamos unas notas, y se las pasamos al valor del contexto
    const [notes, setNotes] = useState<Note[]>([]);

    async function loadNotes() {
        const res = await fetch("/api/notes");
        const data = await res.json();
        setNotes(data);
    }
    
    async function createNote(note: CreatedNote) {
        const res = await fetch("/api/notes", {
            method: "POST",
            body: JSON.stringify(note),
            headers: {
                'Content-Type': "application/json"
            }
        });

        const newNote = await res.json()
        setNotes([...notes, newNote]);
    }

    async function deleteNote(id: number) {
        const res = await fetch("http://localhost:3000/api/notes/" + id, {
            method: "DELETE",
        }) 
        const data = await res.json()
        console.log(data)
        //Para que quite la card que hemos eliminado.
        setNotes(notes.filter((note) => note.id != id));
    }

    return <NoteContext.Provider value={{notes, loadNotes, createNote, deleteNote}}>{children}</NoteContext.Provider>
}