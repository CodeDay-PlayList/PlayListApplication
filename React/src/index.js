import React, { useRef, useState } from "react";
import axios from "axios";
import ReactDom from "react-dom";
import "./index.css";
import { CameraOutline } from "react-ionicons";
import Tesseract from "tesseract.js";
// import myText from "./ArtistList.txt";
// const fetch = require("node-fetch");

function ImageUpload() {
  const inputFileRef = useRef(null);
  const [isActive, setActive] = useState("false");
  const [previewChange, previewSet] = useState("image");
  const [fufilledImage, currentImg] = useState([]);
  // const [database, setDatabase] = useState([]);

  const onFileChange = (e) => {
    previewSet(URL.createObjectURL(e.target.files[0]));
    artistStrip(e.target.files[0]);
    console.log(`Selected File - ${e.target.files[0].name}`);
  };

  const onBtnClick = () => {
    inputFileRef.current.click();
    setActive(!isActive);
  };

  // const artistStrip = async (img) => {
  //   Tesseract.recognize(img, "eng", {
  //     logger: (m) => console.log(m),
  //   }).then(({ data: { words } }) => {
  //     let finResults = [];
  //     let results = words.filter((word) => word.confidence >= 80);
  //     results.forEach((word) => finResults.push(word.text));
  //     console.log(words);
  //     console.log(finResults);
  //     currentImg(finResults);
  //   });
  // };

  // const dbText = () => {
  //   setDatabase(
  //     fetch(myText)
  //       .then((r) => r.text())
  //       .then((text) => {
  //         text
  //           .replace(/(\r)/gm, " ")
  //           .split("\n")
  //           .map((x) => x.trim());
  //       })
  //   );
  // };

  const artistStrip = async (img) => {
    Tesseract.recognize(img, "eng", {
      logger: (m) => console.log(m),
    }).then(({ data: { text } }) => {
      let manipulateText = text
        .toLowerCase()
        .replace(/the/g, "")
        .replace(/and/g, "")
        .replace(/its/g, "")
        .replace(/(\r\n|\n|\r)/gm, " ")
        .replace(/[^\w\s]|_/g, "")
        .split(" ")
        .filter((item) => item.length > 2);
      // dbText();
      // console.log(database);
      // let reader = new FileReader();
      // reader.readAsText(myText);
      // reader.onload = () => {
      //   console.log(reader.result);
      // };

      console.log(manipulateText);
      currentImg(manipulateText);
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
