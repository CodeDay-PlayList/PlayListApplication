import React, { useRef, useState } from "react";
import ReactDom from "react-dom";
import "./index.css";
import { CameraOutline } from "react-ionicons";

function ImageUpload() {
  const inputFileRef = useRef(null);

  // let fileName;

  const onFileChange = (e) => {
    // fileName = `Selected File - ${e.target.files[0].name}`;
    console.log(`Selected File - ${e.target.files[0].name}`);
  };

  const onBtnClick = () => {
    inputFileRef.current.click();
    setActive(!isActive);
  };

  const [isActive, setActive] = useState("false");

  return (
    <div className="imageupload">
      <header className="title">
        <h2>PlayFest</h2>
      </header>
      <div className={isActive ? "inactive" : "tapuploadfile"}>
        <label htmlFor="file" onChange={onFileChange}>
          fileName
        </label>
      </div>
      <div className={isActive ? "tapupload" : "inactive"} onClick={onBtnClick}>
        <CameraOutline color={"#00000"} height="100px" width="100px" />
        <p>Take a Picture Or Browse your library to Upload a photo</p>
      </div>
      <div className="uploadbutton">
        <input
          style={{ display: "none" }}
          type="file"
          ref={inputFileRef}
          onChange={onFileChange}
        />
        <button>Upload</button>
      </div>
    </div>
  );
}

ReactDom.render(<ImageUpload />, document.getElementById("root"));
