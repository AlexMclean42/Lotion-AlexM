import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./index.css";


function Layout() {
  const [showMe, setShowMe] = useState(true);
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  const handleAddNote = () => {
    const newNote = { id: Date.now().toString(), title: "Untitled" };
    setNotes([...notes, newNote]);
    navigate('/notes/edit');
  };

  const operation = () => {
    setShowMe(!showMe);
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
          <h1 className="header_title">Lotion</h1>
          <h4 className="header_subtitle">Like Notion, but worse.</h4>
        </div>
      </header>
      {showMe ? (
        <div id="container">
          <aside className="notes">
            <div className="notes_header">
              <h2>Notes</h2>
              <button className="plus_button" onClick={handleAddNote}>
                +
              </button>
            </div>
            <div className="note_list">
              {notes.length === 0 ? (
                <div className="no_notes">
                  <h2>No Note Yet</h2>
                </div>
              ) : (
                <NoteList notes={notes} />
              )}
            </div>
          </aside>
          <div id="content">
            <Outlet />
          </div>
        <div className="notes_body">
          <h2>Select a note, or create a new one.</h2>
        </div>
        </div>
        
      ) : (
        <div className="notes_body">
          <h2>Select a note, or create a new one.</h2>
        </div>
      )}
    </>
  );
}

function NoteList({ notes }) {
  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id}>{note.title}</li>
      ))}
    </ul>
  );
}

export default Layout;
