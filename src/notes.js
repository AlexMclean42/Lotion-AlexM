import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./index.css";


function Notes() {
  const [showMe, setShowMe] = useState(true);
  const navigate = useNavigate();


  const handleAddNote = () => {
      navigate("/notes/edit");
  };


  const operation = () => {
      setShowMe(!showMe);
  };
  return (
      <>
          <header>
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
                      <div className="no_notes">
                      <h2>No Note Yet</h2>
                      </div>
                  </aside>
              <div className="notes_body">
                  <h2>Select a note, or create a new one.</h2>
              </div>
              <div id="content">
                  <Outlet />
              </div>
              </div>
          ) : null}
          {!showMe ? (
              <div className="notes_body">
              <h2>Select a note, or create a new one.</h2>
              </div>
          ) : null}
      </>
  );
}


export default Notes;



