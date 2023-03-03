import Datetime from "./Datetime";
import { useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import "./index.css";
import { v4 as uuidv4 } from "uuid";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function NoteEdit() {
  const [showMe, setShowMe] = useState(true);
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const textBoxRef = useRef(null);
  const [content, setContent] = useState('');
  const [noteTitle, setNoteTitle] = useState('');
  const [noteDate, setNoteDate] = useState('');

  const handleAddNote = () => {
    const note = {
      id: uuidv4(),
      text: "Untitled",
      title: "Untitled",
      date: Date.now()
    };
    setNotes([...notes, note]);
    setSelectedNote(note);
    textBoxRef.current.value = "Untitled";
    setNoteTitle("Untitled");
    setNoteDate(note.date);
  };

  const handleSaveNote = () => {
    const title = textBoxRef.current.value;
    const noteIndex = notes.findIndex((note) => note.id === selectedNote.id);
    const note = { ...selectedNote, title, date: Date.now(), text: content };
    const updatedNotes = [...notes];
    updatedNotes[noteIndex] = note;
    setNotes(updatedNotes);
    setSelectedNote(note);
    setNoteTitle(title);
    setNoteDate(note.date);
  };

  const handleDeleteNote = () => {
    if (!selectedNote) {
      return;
    }
    const updatedNotes = notes.filter((note) => note.id !== selectedNote.id);
    setNotes(updatedNotes);
    setSelectedNote(null);
    setNoteTitle('');
    setNoteDate('');
    setContent('');
  };

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setNoteTitle(note.title);
    setNoteDate(note.date);
    setContent(note.text);
  };

  const operation = () => {
    setShowMe(!showMe);
  };

  const handleContentChange = (content) => {
    setContent(content);
  }

  const handleTitleChange = (event) => {
    setNoteTitle(event.target.value);
  }

  return (
    <>
      <header className="mainheader">
        <div className="button_hamburger">
          <button className="hamburger" type="button" onClick={operation}>
            &#9776;
          </button>
        </div>
        <div className="header_text">
          <h1 className="header_title">Lotion</h1>
          <h4 className="header_subtitle">Like Notion, but worse.</h4>
        </div>
      </header>
      <div id="container">
        {showMe ? (
          <aside>
            <div className="notes_header">
              <h2>Notes</h2>
              <button className="plus_button" onClick={handleAddNote}>
                +
              </button>
            </div>
            {notes.length === 0 ? (
              <div className="no_notes">
                <h2>No Note Yet</h2>
              </div>
            ) : (
              <div className="notes_list">
                {notes.map((note) => (
              <div
                key={note.id}
                className={`note ${
                  selectedNote && selectedNote.id === note.id
                    ? "selected"
                    : ""
                }`}
                onClick={() => handleNoteClick(note)}
              >
              <div>{note.title}</div>
            </div>
                ))}
</div>
)}
</aside>
) : null}
<main>
<div className="note_editor">
<div className="note_editor_title">
<input
             type="text"
             className="note_title_input"
             placeholder="Untitled"
             ref={textBoxRef}
             value={noteTitle}
             onChange={handleTitleChange}
           />
<Datetime date={noteDate} />
</div>
<ReactQuill 
           theme="snow"
           value={content} 
           onChange={handleContentChange}
           className="quill_editor"
         />
<div className="note_editor_buttons">
<button className="delete_button" onClick={handleDeleteNote}>
Delete
</button>
<button className="save_button" onClick={handleSaveNote}>
Save
</button>
</div>
</div>
</main>
</div>
<Outlet />
</>
);
}

export default NoteEdit;