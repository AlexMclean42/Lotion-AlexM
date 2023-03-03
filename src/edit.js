import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./index.css";

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      content: '',
      displayContent: ''
    };
  }

  handleContentChange = (content) => {
    this.setState({ 
      content,
      displayContent: content 
    });
  }

  render() {
    const { displayContent } = this.state;
    return (
      <div>
        <ReactQuill value={this.state.content} onChange={this.handleContentChange} className="my-react-quill" placeholder="Your New Note" />
      </div>
    );
  }
}

export default Edit;
