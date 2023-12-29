"use client"
import {createContext, useState, useContext} from 'react'
import {CreatedNote, UpdateNote } from '@/interfaces/conteContext';
import {Note} from '@prisma/client'

//Le quite el export por que ya no es necesario exportarlo, puesto qe hemos creado un hook para que realice esto.
export const NoteContext = createContext<{
    notes: Note[];
    loadNotes: () => Promise<void>;
    createNote: (note: CreatedNote) => Promise<void>;
    deleteNote: (id: number) => Promise<void>;
    selectedNote: Note | null;
    setSelectedNote: (note: Note | null) => void;
    UpdateNote: (id: number, note: UpdateNote) => Promise<void>;
}>({

    notes: [],
    loadNotes: async () =>{},
    createNote: async (note: CreatedNote) => {},
    deleteNote: async(id: number) => {},
    selectedNote: null,
    setSelectedNote: (note: Note | null) => {},
    UpdateNote: async (id: number, note: UpdateNote)=> {},
});
//Lo anterior es solo para que cumple ts

//Creando nuestro hook, que lo ejecute el contexto. Lo que evita tener que tengamos que exportar el contexto y el useContext en cada componente de react.
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
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);

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

    async function UpdateNote(id: number, note: UpdateNote) {
        const res = await fetch('api/notes/' + id,{
            method: 'PUT',
            body: JSON.stringify(note),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();

        //Mostramos la nota actualizada si es necesario.
        //Si el id de la nota actualizada  es el mismo que el que esta en la nota. ACTUALIZA LA NOTA DESDE EL FRONTEND
        setNotes(notes.map((note)=> (note.id === id? data : note)));
    }

    return <NoteContext.Provider value={{notes, loadNotes, createNote, deleteNote,
    selectedNote, setSelectedNote, UpdateNote}}>{children}</NoteContext.Provider>
}