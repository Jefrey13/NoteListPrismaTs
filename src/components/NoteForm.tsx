"use client"
// import {useState, useContext} from 'react'
// import { NoteContext } from '@/context/NoteContext'
import {useState, useRef, useEffect} from 'react'
import {useNotes} from '@/context/NoteContext'

function NoteForm() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const titleRef = useRef<HTMLInputElement>(null);

    // const {createNote} = useContext(NoteContext);
    const {createNote, selectedNote, setSelectedNote, UpdateNote} = useNotes();

    //Para que se seleccione en los input.
     useEffect(() => {
      if(selectedNote){
        setTitle(selectedNote.title);
        setContent(selectedNote.content || "");
      }
    }, [selectedNote]);
    
  return (
    <form onSubmit={async (e)=>{
        e.preventDefault();
        //Validamos si devemos actualizar o crear
        if(selectedNote){
          UpdateNote(selectedNote.id , {
            title,
            content
          })
          setSelectedNote(null)
        }else{
          await createNote({
            title,
            content,
        });
        }

        setTitle("");
        setContent("");
        titleRef.current?.focus();
    }}>
        <input type="text" name="title" id="title" autoFocus placeholder="Title" maxLength={100} className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2" value={title} onChange={e=> setTitle(e.target.value)} ref={titleRef}/>

        <textarea name="content" id="content" placeholder='Content' maxLength={500} className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2" value={content} onChange={e=> setContent(e.target.value)}> </textarea>

        <div className='flex justify-end gap-x-3'>

        <button type='submit' className="px-5 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-30 disabled:cursor-not-allowed" disabled={!title || !content}>
          {selectedNote ? "Update" : "Create"}
        </button>

        {selectedNote && (
          <button type='button' className="px-5 py-2 text-white bg-red-600 rounded-md hover:bg-red-70"
          onClick={()=> 
          { setSelectedNote(null)
            setTitle("")
            setContent("")
          }}>Cancel</button>
        )}
        </div>
    </form>
  )
}

export default NoteForm