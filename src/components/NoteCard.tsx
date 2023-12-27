"use client"
// import {Note} from '@/interfaces/conteContext'
import {Note} from '@prisma/client'
import {useNotes} from '@/context/NoteContext'

function NoteCard({note}: {note: Note}) {

    const {deleteNote} = useNotes();

  return (
    <div className='bg-indigo-400 rounded-md text-neutral-800 my-3 p-5 flex justify-between'>
          <div>
          <h1 className='font-bold'>{note.title}</h1>
          <p>{note.content}</p>
          </div>
          <div className='flex gap-x-2'>
            <button onClick={async()=> {
                if(confirm("Are you sure you want to delete this note?")){
                    await deleteNote(Number(note.id))
                }
            }}>Delete</button>

            <button onClick={(e)=>{}}>Edit</button>
          </div>
    </div>
  )
}

export default NoteCard