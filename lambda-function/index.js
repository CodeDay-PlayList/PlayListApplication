("use strict");
const fuzzy = require("fuse.js");
const fs = require("fs");

const database = fs
  .readFileSync("ArtistList.txt", "utf8")
  .replace(/(\r)/gm, " ")
  .split("\n")
  .map((x) => x.trim());

const options = {
  includeScore: true,
  threshold: 0.25,
};

const fuse = new fuzzy(database, options);

// AWS Lambda Handler
exports.handler = async (event) => {
  let validArtists = [];

  let artists;
  artists = event.body;
  console.log(
    "Current Artists: " + artists,
    "Event: " + event,
    "Valid Artists" + validArtists
  );

  // for (let word of artists) {
  //   const result = fuse.search(word).sort((a, b) => a.score - b.score)[0];
  //   if (result) {
  //     if (!validArtists.includes(database[result.item])) {
  //       validArtists.push(database[result.item]);
  //     }
  //   }
  // }

  let response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers":
        "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Methods": "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT",
    },
    body: artists,
    isBase64Encoded: false,
  };

  if (!artists) {
    response = {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: "Something went wrong",
      isBase64Encoded: false,
    };
  }

  return response;
};
