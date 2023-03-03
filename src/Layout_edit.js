import Datetime from "./Datetime";
import Datetime2 from "./Datetime2";
import { useState, useRef, useEffect } from "react";
import { Outlet, useNavigate, useParams, useLocation} from "react-router-dom";
import "./index.css";
import { v4 as uuidv4 } from "uuid";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


function NoteEdit() {
  const [showMe, setShowMe] = useState(true);
  const [showMe2, setShowMe2] = useState(true);
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const textBoxRef = useRef(null);
  const ReactQuillBoxRef = useRef(null);
  const [content, setContent] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDate, setNoteDate] = useState("");
  const [editMode, setEditMode] = useState(true);

  useEffect(() => {
    // Load notes from localStorage when the component mounts
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);


  const note = {
      id: uuidv4(),
      text: "...",
      title: "Untitled",
      date: Date.now(),
  };
  
const { id } = useParams();

// useEffect(() => {
//   var noteIndex = notes.findIndex((note) => note.id === selectedNote.id);
//   // Find the note with the ID from useParams() and set the state accordingly
//   if (noteIndex === -1) {
//     noteIndex = id;
//   }
//   console.log(noteIndex);
//   if (!note) {
//     setSelectedNote(note);
//     setNoteTitle(note.title);
//     setNoteDate(note.date);
//     setContent(note.text);
//     setShowMe2(false);
//     setEditMode(true);
//     console.log("noteIndex");
//   }
// }, [id]);








  
  const handleAddNote = () => {
    const noteIndex = 1;
    setShowMe2(false);
    setEditMode(false);
    const newNote = { id: notes.length + 1 };
    setNotes([newNote, ...notes]);
    navigate(`/notes/${noteIndex}/edit`);
    setNotes([note, ...notes]);
    setSelectedNote(note);
    textBoxRef.current.value = "Untitled";
    setNoteTitle("Untitled");
    setNoteDate("");
    setContent("");
    saveNotesToLocalStorage([note, ...notes]);
  };

  const handleSaveNote = () => {
    const title = textBoxRef.current.value;
    const noteIndex = notes.findIndex((note) => note.id === selectedNote.id);
    // console.log(noteIndex);
    let dateValue = Date.now();
    if (noteDate) {
      dateValue = new Date(noteDate).getTime();
    }
    const note = { ...selectedNote, title, date: dateValue, text: content };
    const updatedNotes = [...notes];
    updatedNotes[noteIndex] = note;
    setNotes(updatedNotes);
    setSelectedNote(note);
    setNoteTitle(title);
    setNoteDate(note.date);
    setShowMe2(false);
    setEditMode(true);
    textBoxRef.current.disabled = true; 
    ReactQuillBoxRef.current.disabled = true; 
    saveNotesToLocalStorage(updatedNotes);
    navigate(`/notes/${noteIndex + 1}`);
  };


  const handleDeleteNote = () => {
    // eslint-disable-next-line no-restricted-globals
    const response = confirm("Are you sure?");
    if (!selectedNote || !response) {
      return;
    }
    const updatedNotes = notes.filter((note) => note.id !== selectedNote.id); 
    setNotes(updatedNotes);
    setSelectedNote(null);
    setNoteTitle("Untitled");
    setNoteDate("");
    setContent("");
    setShowMe2(true);
    saveNotesToLocalStorage(updatedNotes);
    setEditMode(true);
  };

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setNoteTitle(note.title);
    setNoteDate(note.date);
    setContent(note.text);
    setShowMe2(false);
    setEditMode(true);
    const noteIndex = notes.findIndex((n) => n.id === note.id) + 1;
    navigate(`/notes/${noteIndex}`);
  };



  const operation = () => {
    setShowMe(!showMe);
  };

  const handleContentChange = (content) => {
    setShowMe2(false);
    setContent(content);
  };

  const handleTitleChange = (event) => {
    setNoteTitle(event.target.value);
  };

  const saveNotesToLocalStorage = (notes) => {
    localStorage.setItem("notes", JSON.stringify(notes));
  };


const handleDatetimeChange = (event) => {
  const date = new Date(event.target.value);
  setNoteDate(date);
};




  return (
    <>
      
      <header className="mainheader">
        <div className="button_hamburger">
          <button className="hamburger" type="button" onClick={operation}>
            &#9776;
          </button>
        </div>
        <div className="header_text">
          <h1 className="header_title">Lotion   </h1>
          <h4 className="header_subtitle">Like Notion, but worse.</h4>
        </div>
        <div> {id} </div>
      </header>
      <div id="container">
        {showMe ? (
          <aside>
            <div className="notes_header">
              <h2>Notes</h2>
              <button className="plus_button" onClick={handleAddNote} key={note.id}>
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
                    selectedNote && selectedNote.id === note.id ? "selected" : ""
                  }`}
                  onClick={() => handleNoteClick(note)}
                >
                  <div className="title">{note.title}</div>
                  <div className="datetime">{new Date(note.date).toLocaleString()}</div>
                  <div className="text">
                    {note.text.replace(/<\/?[^>]+(>|$)/g, "")}
                  </div>
                </div>
              ))}
            </div>
            )}
          </aside>
        ) : null}
        {!showMe2 ? (
        <div className="textbox">
            <header className="secondheader" style={{width: showMe ? "75vw" : "100vw"}}>
            <div>
              <input
             type="text"
             className="textbox_title"
             ref={textBoxRef}
             value={noteTitle}
            onChange={handleTitleChange}
            disabled={editMode}
                />
                <div>
                <div>
                    {!editMode &&  <input
                      type="datetime-local"
                      value={noteDate ? new Date(noteDate).toISOString().slice(0, 16) : new Date(Date.now()).toISOString().slice(0, 16)}
                      
                      onChange={handleDatetimeChange}
                      className="calander"
                    />}
                  </div>
                  {/* {!editMode && <Datetime date={noteDate} />} */}
                 <div className="datetime2">
                    {editMode && <Datetime2 date={noteDate} />}
                    </div>
                  </div>
            </div>
          <div className="button_save_delete" >
            {editMode ? (
              <button
                className="editbutton"
                type="button"
                onClick={() => {
                  setEditMode(false); // Switch to save mode
                  textBoxRef.current.disabled = false; // Enable the text box in edit mode
                  const noteIndex = notes.findIndex((note) => note.id === selectedNote.id) + 1;
                  navigate(`/notes/${noteIndex}/edit`);
                }}
              >
                Edit
              </button>
            ) : (
              <button className="savebutton" type="button" onClick={handleSaveNote}>
                Save
              </button>
            )}
                <button className="deletebutton" type="button" onClick={handleDeleteNote}>
              Delete
            </button>
          </div>
            </header>
            {!editMode ? (
              <ReactQuill 
                        theme="snow"
                        value={content} 
                        onChange={handleContentChange}
                        className="my-react-quill"
                      placeholder="Your New Note"
              ref={ReactQuillBoxRef}
                readOnly={editMode}
                style={{width: showMe ? "75vw" : "100vw"}}
                // 
                
              />
            ) : (<>
                <div className="editcontent" style={{ width: showMe ? "75vw": "100vw"}} >
                  <div className="no_edit_content" style={{width: showMe ? "73vw" : "97vw"}}>
                    {content.replace(/<\/?[^>]+(>|$)/g, "", )}
                    </div>
                </div>
            </>
            )}
            </div>
        ) : (
        <div className="notes_body">
          <h2>Select a note, or create a new one.</h2>
        </div>
          )}
        <div id="content">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default NoteEdit;
