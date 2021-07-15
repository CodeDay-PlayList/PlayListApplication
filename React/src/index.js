import React from "react";
import ReactDom from "react-dom";
import "./index.css";
import { CameraOutline } from "react-ionicons";

function ImageUpload() {
  // state = {
  //   selectedFile: null,
  // };

  // const fileSelectedHandler = (event) => {
  //   this.setState({
  //     selectedFile: event.target.files[0],
  //   });
  // };

  // const fileUploadHandler = () => {};
  return (
    <div className="imageupload">
      <header className="title">
        <h2>PlayFest</h2>
      </header>
      <div className="tapupload">
        <CameraOutline color={"#00000"} height="100px" width="100px" />
        <p>Take a Picture Or Browse your library to Upload a photo</p>
      </div>
      <div className="uploadbutton">
        <input style={{ display: "none" }} type="file" />
        <button>Select</button>
        <button style={{ background: "#22c1c3" }}>Upload</button>
      </div>
    </div>
  );
}

ReactDom.render(<ImageUpload />, document.getElementById("root"));
