import open from 'open';
import SpotifyWebApi from 'spotify-web-api-node';


const SpotifyHandler = async (artists) => {
  // variables
  let tracks = '';
  let playlistID = '';
  // const artists = [
  //   'Tame Impala', 'Lizzo', 'The Strokes'
  // ];
  artists = artists.slice(0,7);

  // credentials are optional
  const spotifyApi = new SpotifyWebApi({
    clientId: 'b676f39d33f74696a8b8304c52a07a43',
    clientSecret: 'd9f5fe324ef44216baeeaff9ded08f69',
    redirectUri: 'http://www.playfest.com.s3-website-us-east-1.amazonaws.com/'
  });


  spotifyApi.setAccessToken('BQCdpFjsQAudn88Uvquea1ExjRJmXPxEa_NkgZSuzg6r-4vv6rZww_PXhLVyEZZJtzziK1GwpTXdSXTC6z-jo3txDz5PS9BtJhJ9OjFwOglwe9FRXUfMwCuW8rSQ9CQ3YnCVkrTzAZ4wLgsVQJlJ_ZLtVUSUMo1sbcS5oxGb8wwjXuFgIxTzg1t8hHDibaPX_wYlPj3xa0hGTjPOz9VPCRCv2Rvu');


// Create a private playlist
  await spotifyApi.createPlaylist('CodeDay Demo Playlist', { 'description': 'My description', 'public': true })
    .then(function(data) {
      playlistID = (data.body.id).toString();
    }, function(err) {
      console.log('Something went wrong!', err);
    });

  for (let i = 0; i < artists.length; i++) {
    spotifyApi.searchArtists(artists[i]).then(
      function(data) {
        const artistID = data.body.artists.items.sort((a,b) => (a.popularity > b.popularity))[0].id;
        // artistIDs.push(artistID);
        spotifyApi.getArtistTopTracks(artistID, 'US').then (
          function(data) {
            tracks = (data.body.tracks[0].uri).toString();

            // Add tracks to a playlist
            spotifyApi.addTracksToPlaylist(playlistID, [tracks])
              .then(function(data) {
                if (i === artists.length - 1) {
                  // open(`https://open.spotify.com/playlist/${playlistID}`);
                }
              }, function(err) {
                console.log('Something went wrong!', err);
              });
          }
        )
      },
      function(err) {
        console.error(err);
      }
    );
  }



}


export default SpotifyHandler;
