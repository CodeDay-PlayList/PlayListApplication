import React, { useRef, useState } from "react";
import axios from "axios";
import ReactDom from "react-dom";
import "./index.css";
import { CameraOutline } from "react-ionicons";
import Tesseract from "tesseract.js";

function ImageUpload() {
  const inputFileRef = useRef(null);
  const [isActive, setActive] = useState("false");
  const [previewChange, previewSet] = useState("image");
  const [fufilledImage, currentImg] = useState(null);

  const onFileChange = (e) => {
    previewSet(URL.createObjectURL(e.target.files[0]));
    currentImg(artistStrip(e.target.files[0]));
    console.log(`Selected File - ${e.target.files[0].name}`);
  };

  const onBtnClick = () => {
    inputFileRef.current.click();
    setActive(!isActive);
  };

  const artistStrip = async (img) => {
    Tesseract.recognize(img, "eng", {
      logger: (m) => console.log(m),
    }).then(({ data: { words } }) => {
      console.log(`Hello ${words}`);
      return words;
    });
  };

  const uploadHandler = () => {
    // const fd = new FormData();
    // fd.append("image", fufilledImage);
    axios
      .post(
        "https://88q3as42oj.execute-api.us-east-1.amazonaws.com/testPlay/GoogleVision",
        fufilledImage
      )
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div className="imageupload">
      <header className="title">
        <h2>PlayFest</h2>
      </header>
      <div className={isActive ? "inactive" : "tapuploadfile"}>
        <img src={previewChange} alt="Music Poster" />
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
        <button onClick={uploadHandler}>Upload</button>
      </div>
    </div>
  );
}

ReactDom.render(<ImageUpload />, document.getElementById("root"));
