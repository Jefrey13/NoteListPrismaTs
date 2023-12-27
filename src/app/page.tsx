'use client'
import NoteForm from '@/components/NoteForm'
// import {NoteContext} from '@/context/NoteContext'
// import {useContext, useEffect} from 'react'
import {useNotes} from '@/context/NoteContext'
import NoteCard from '@/components/NoteCard'
import {useEffect} from 'react'

// async function loadNotes() {
//   const res = await fetch("http://localhost:3000/api/notes");
//   const data = await res.json();
//   return data;
// }

function HomePage() {
  // const notes = await loadNotes();
  // console.log({notes})

  // const {notes, loadNotes} = useContext(NoteContext);
  const {notes, loadNotes} = useNotes();

  //Para que se carge solo en la carga inicial.
  useEffect(()=>{
    loadNotes()
  }, []);

  return (
    <div className='flex justify-center items-center h-screen'>
      <div>
      <NoteForm />

      {notes.map((note) =>(
        <NoteCard note={note} key={note.id}/>
      ))}
      </div>
    </div>
  );
}

export default HomePage