import React, { useRef, useState } from "react";
import axios from "axios";
import ReactDom from "react-dom";
import "./index.css";
import { CameraOutline } from "react-ionicons";
import Tesseract from "tesseract.js";
<<<<<<< Updated upstream
=======
import fuzzy from "fuse.js";
import myText from "./ArtistList.txt"
import SpotifyHandler from "./spotifyHandler";

let db = [];       // temp code - should be replaced
let validArtist = []; // temp code - should be replaced
>>>>>>> Stashed changes

function ImageUpload() {
  const inputFileRef = useRef(null);
  const [isActive, setActive] = useState("false");
  const [previewChange, previewSet] = useState("image");
  const [fufilledImage, currentImg] = useState([]);
<<<<<<< Updated upstream
=======
  const [database, setDatabase] = useState([]); // should be using UseState
  //const [validArtist, setValidArtist] = useState([]); // should be using UseState

  const options = {
    includeScore: true,
    threshold: 0.25
  }
>>>>>>> Stashed changes

  const onBtnClick = () => {
    inputFileRef.current.click();
    setActive(!isActive);
  };

  // Function that sets image uploaded by user and calls artistStrip function
  const onFileChange = (e) => {
    previewSet(URL.createObjectURL(e.target.files[0]));
    artistStrip(e.target.files[0]);
    console.log(`Selected File - ${e.target.files[0].name}`);

  };

<<<<<<< Updated upstream
  // Function that uses Tesseract OCR & creates an array
  // from artist names before sending to post
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
      console.log(manipulateText);
      currentImg(manipulateText);
    });
  };

  // Function sends POST request of an array
  // of artists to Lambda function
  const uploadHandler = () => {
    axios
      .post(
        "https://88q3as42oj.execute-api.us-east-1.amazonaws.com/testPlay/GoogleVision",
        fufilledImage
      )
      .then((res) => {
        console.log(res);
      });
  };

  // JSX format for the front-end
=======
  const onBtnClick = () => {
    initalizeDB();
    inputFileRef.current.click();
    setActive(!isActive);
  };

  const initalizeDB = async () => {
    await fetch(myText)
        .then((result) => result.text())
        .then(text => {
          const temp = (text.split('\n').map(x=>x.trim()));
          setDatabase( database.push(...temp));
          db.push(...database);    // temp code for use - Should be using UseState
        })
  }

  const fuzzySearch = () => {
    const fuse = new fuzzy(db, options);
    // console.log(db);
    for (const word of fufilledImage) {
      const result = fuse.search(word).sort((a,b) => a.score - b.score)[0];
      if (result && !validArtist.includes(result.item)) {
        validArtist.push(result.item);
      }
    }
    // console.log(validArtist);
  }

  const artistStrip = async (img) => {
    await Tesseract.recognize(img, "eng", {
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
      currentImg(fufilledImage.push(...manipulateText));
    })
    fuzzySearch();
  };

  const uploadHandler = () => {
    // console.log(validArtist);
    // axios
    //   .post(
    //     "https://88q3as42oj.execute-api.us-east-1.amazonaws.com/testPlay/GoogleVision",
    //     validArtist
    //   )
    //   .then((res) => {
    //     console.log(res);
    //   });
    SpotifyHandler(validArtist);
  };

>>>>>>> Stashed changes
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
