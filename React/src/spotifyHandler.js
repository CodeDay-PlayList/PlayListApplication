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
    clientId: 'CLIENT ID',
    clientSecret: 'CLIENT SECRET',
    redirectUri: 'REDIRECT URI'
  });


  spotifyApi.setAccessToken('TOKEN');


// Create a private playlist
  await spotifyApi.createPlaylist('CodeDay Demo Playlist', { 'description': 'My description', 'public': true })
    .then(function(data) {
      playlistID = (data.body.id).toString();
    }, function(err) {
      console.log('Something went wrong!', err);
    });

  for (let i = 0; i < artists.length; i++) {
    setTimeout(function timer() {
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
    }, i * 1000)
  }



}


export default SpotifyHandler;
