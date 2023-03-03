import { Routes, Route } from 'react-router-dom'
import NoteEdit from './Layout_edit';
import Layout from './Layout';




function App() {
  return (
    <Routes>
      <Route path='/' element={<NoteEdit />} />
      <Route path='notes' element={< NoteEdit />} />
      <Route path='notes/:id' element={<NoteEdit />} />
      <Route path='/notes/:id/edit' element={<NoteEdit />} />
    </Routes>
  )
}


export default App;
