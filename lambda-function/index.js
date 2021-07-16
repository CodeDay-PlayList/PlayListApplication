const fetch = require('node-fetch');

exports.handler = async (event) => {
  const res = await fetch('https://api.ocr.space/parse/imageurl?apikey=b4182a4ab988957&url=https://festuff-production.s3.amazonaws.com/uploads/image/attachment/42789/lineup-666-poster-5a273000-491b-421a-8755-3dc0a03034ff.jpg');
  const json = await res.json();
  return json.ParsedResults.pop().ParsedText.replace(/(\r\n|\n|\r)/gm, "");
};