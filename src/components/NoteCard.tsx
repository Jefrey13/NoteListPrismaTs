"use client"
// import {Note} from '@/interfaces/conteContext'
import {Note} from '@prisma/client'
import {useNotes} from '@/context/NoteContext'
import {HiTrash, HiPencil} from 'react-icons/hi'

function NoteCard({note}: {note: Note}) {

    const {deleteNote, setSelectedNote} = useNotes();

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
            }}>
              <HiTrash className="text-2xl text-red-500 hover:text-red-600"/>
            </button>

            <button onClick={()=> {setSelectedNote(note)}}>
              <HiPencil className="text-2xl hover:text-slate-800"/>
            </button>
          </div>
    </div>
  )
}

export default NoteCard