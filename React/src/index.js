import React, { useRef, useState } from "react";
import ReactDom from "react-dom";
import "./index.css";
import { CameraOutline } from "react-ionicons";

function ImageUpload() {
  const inputFileRef = useRef(null);
  const [isActive, setActive] = useState("false");
  const [previewChange, previewSet] = useState("image");

  const onFileChange = (e) => {
    previewSet(URL.createObjectURL(e.target.files[0]));
    console.log(`Selected File - ${e.target.files[0].name}`);
  };

  const onBtnClick = () => {
    inputFileRef.current.click();
    setActive(!isActive);
  };

  return (
    <div className="imageupload">
      <header className="title">
        <h2>PlayFest</h2>
      </header>
      <div className={isActive ? "inactive" : "tapuploadfile"}>
        <img src={previewChange} alt="image" />
      </div>
      <div className={isActive ? "tapupload" : "inactive"} onClick={onBtnClick}>
        <CameraOutline color={"#00000"} height="100px" width="100px" />
        <p>Tap to Take a Picture Or Browse your library to Upload a photo</p>
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
