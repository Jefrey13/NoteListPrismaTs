"use client"
// import {useState, useContext} from 'react'
// import { NoteContext } from '@/context/NoteContext'
import {useState, useRef} from 'react'
import {useNotes} from '@/context/NoteContext'

function NoteForm() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const titleRef = useRef<HTMLInputElement>(null);

    // const {createNote} = useContext(NoteContext);
    const {createNote} = useNotes();

  return (
    <form onSubmit={async (e)=>{
        e.preventDefault();
        await createNote({
            title,
            content,
        });

        setTitle("");
        setContent("");
        titleRef.current?.focus();
    }}>
        <input type="text" name="title" id="title" autoFocus placeholder="Title" maxLength={100} className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2" value={title} onChange={e=> setTitle(e.target.value)} ref={titleRef}/>

        <textarea name="content" id="content" maxLength={500} className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2" value={content} onChange={e=> setContent(e.target.value)}> </textarea>

        <button className="px-5 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">Create</button>
    </form>
  )
}

export default NoteForm