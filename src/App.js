import React, { Component } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import FilesUploadComponent from "./components/files-upload-component";
import Upload from "./components/Upload";

class App extends Component {
  render() {
    return (
      <div className="App">
        <FilesUploadComponent />
        <Upload />
      </div>
    );
  }
}

export default App;
