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

  return response;
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
