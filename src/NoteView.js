import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function NoteView({ notes }) {
  const [noteText, setNoteText] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const selectedNote = notes.find((note) => note.id === id);
    setNoteText(selectedNote.text);
  }, [notes, id]);

  return (
    <>
      <header className="mainheader">
        <h1 className="header_title">Lotion</h1>
        <h4 className="header_subtitle">Like Notion, but worse.</h4>
      </header>
      <div className="note_content">
        <h2>Note</h2>
        <div className="note_text">{noteText}</div>
      </div>
    </>
  );
}

export default NoteView;
