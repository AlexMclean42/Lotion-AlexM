import { useState } from 'react';
import { useNavigate, useParams, BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

function App3() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  const handleCreateNote = () => {
    const newNote = { id: notes.length + 1, title: 'New Note', content: '' };
    setNotes([...notes, newNote]);
    navigate(`/notes/${newNote.id}`);
  };

  const handleEditNote = (id) => {
    navigate(`/notes/${id}/edit`);
  };

  const handleSaveNote = (id, updatedNote) => {
    const updatedNotes = notes.map((note) => (note.id === id ? updatedNote : note));
    setNotes(updatedNotes);
    navigate(`/notes/${id}`);
  };

  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/notes">Notes</Link></li>
          <li><button onClick={handleCreateNote}>New Note</button></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/notes" element={<Notes notes={notes} onEditNote={handleEditNote} />} />
        <Route path="/notes/:id" element={<NoteView notes={notes} onSave={handleSaveNote} />} />
        <Route path="/notes/:id/edit" element={<NoteEditor notes={notes} onSave={handleSaveNote} />} />
      </Routes>
    </Router>
  );
}

function Notes({ notes, onEditNote }) {
  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          <Link to={`/notes/${note.id}`}>{note.title}</Link>
          <button onClick={() => onEditNote(note.id)}>Edit</button>
        </li>
      ))}
    </ul>
  );
}

function NoteView({ notes, onSave }) {
  const { id } = useParams();
  const note = notes.find((note) => note.id === parseInt(id));

  const handleTitleChange = (event) => {
    onSave(note.id, { ...note, title: event.target.value });
  };

  const handleContentChange = (event) => {
    onSave(note.id, { ...note, content: event.target.value });
  };

  return (
    <div>
      <h1>{note.title}</h1>
      <textarea value={note.content} onChange={handleContentChange} />
    </div>
  );
}

function NoteEditor({ notes, onSave }) {
  const { id } = useParams();
  const note = notes.find((note) => note.id === parseInt(id));

  const handleTitleChange = (event) => {
    onSave(note.id, { ...note, title: event.target.value });
  };

  const handleContentChange = (event) => {
    onSave(note.id, { ...note, content: event.target.value });
  };

  return (
    <div>
      <input value={note.title} onChange={handleTitleChange} />
      <textarea value={note.content} onChange={handleContentChange} />
    </div>
  );
}

export default App3;
