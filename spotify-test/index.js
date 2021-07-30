var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
var spotifyApi = new SpotifyWebApi({
    clientId: 'ENTER ID',
    clientSecret: 'ENTER SECRET',
    redirectUri: 'ENTER URI'
});

spotifyApi.setAccessToken('ENTER TOKEN HERE');

let tracks = '';

const artists = [
    'Tame Impala', 'Lizzo', 'The Strokes'];

for (let i = 0; i < artists.length; i++) {
    spotifyApi.searchArtists(artists[i]).then(
        function(data) {
            spotifyApi.getArtistTopTracks((data.body.artists.items.sort((a,b) => (a.popularity > b.popularity))[0].id), 'US').then (
                function(data) {
                    tracks = (data.body.tracks[0].uri).toString();

                    // Add tracks to a playlist
                    spotifyApi.addTracksToPlaylist('ENTER PLAYLIST ID HERE', [tracks])
                        .then(function(data) {
                            if (i === artists.length - 1) {
                                console.log('Check out the new playlist... https://open.spotify.com/playlist/ENTER PLAYLIST ID');
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
