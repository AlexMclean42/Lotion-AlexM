import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Notes from './notes';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import LayoutEdit from './Layout_edit';
import Edit from './edit';
import NoteView from './NoteView'; // import the new component

import NoteApp from './DELETEME';





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App/>
      {/* <Routes> */}
        {/* <Route path="/" />
        <Route path="/notes" element={<LayoutEdit />} />
        <Route path="/notes/edit" element={<LayoutEdit />} /> */}
      {/* </Routes> */}
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
