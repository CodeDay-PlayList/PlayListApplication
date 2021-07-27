("use strict");

async function contentVision() {
  const vision = require("@google-cloud/vision");

  const client = new vision.ImageAnnotatorClient({
    keyFilename: "./GCVOCRkey.json",
  });
  const fileName = "./OL2.jpg";

  // Performs text detection on the local file
  const [result] = await client.textDetection(fileName);
  const detections = result.textAnnotations;
  let artists = [];
  detections.forEach((text) => artists.push(text.description));
  // console.log(artists);
  return JSON.stringify(artists);
}

// contentVision();

exports.handler = async (event) => {
  const fetch = require('node-fetch');
  const fuzzy = require('fuse.js');
  const fs = require('fs');

  const artists = await contentVision();
  // const artists = "Hello";

  let response = {
    statusCode: 200,
    body: artists,
    isBase64Encoded: false,
  };

  if (!artists) {
    response = {
      statusCode: 400,
      body: "Something went wrong",
      isBase64Encoded: false,
    };
  }

  //return response;

  const res = await fetch('https://api.ocr.space/parse/imageurl?apikey=b4182a4ab988957&url=https://festuff-production.s3.amazonaws.com/uploads/image/attachment/42789/lineup-666-poster-5a273000-491b-421a-8755-3dc0a03034ff.jpg');
  const json = await res.json();
  const textArray = json.ParsedResults.pop()
    .ParsedText.toLowerCase()
    .replace(/the/g, '')
    .replace(/and/g, '')
    .replace(/its/g, '')
    .replace(/(\r\n|\n|\r)/gm, " ")
    .replace(/[^\w\s]|_/g, "")
    .split(' ')
    .filter((item) => item.length > 2);
    
  const database = fs.readFileSync('ArtistList.txt', 'utf8').replace(/(\r)/gm, " ").split('\n').map(x=>x.trim());

  let validArtists = [];
  
  const options = {
    includeScore: true,
    threshold: 0.25
  }
  
  const fuse = new fuzzy(database, options);
  
  for (let word of textArray) {
    const result = fuse.search(word).sort((a,b) => a.score - b.score)[0];
    if (result) {
      if(!validArtists.includes(database[result.item])) {
        validArtists.push(database[result.item])
      }
    }
  }

  return validArtists;
};

//////////////////////////////////////////////////
// const vision = require("@google-cloud/vision");

// Code for converting to base64
// const fs = require("fs");
// const imageFile = fs.readFileSync("./OL2.jpg");
// let encoded = Buffer.from(imageFile).toString("base64");

// client
//   .textDetection("./OL2.jpg")
//   .then((results) => {
//     const text = results[0].textAnnotations;

//     console.log("Text:");
//     text.forEach((text) => console.log(text.description));
//   })
//   .catch((err) => {
//     console.error("ERROR:", err);
//   });
//   let hello = JSON.stringify(event);
//   console.log(hello);
// };
