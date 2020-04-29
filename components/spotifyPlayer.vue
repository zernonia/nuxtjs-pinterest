<template>
  <h1>Spotify Player</h1>
</template>

<script>
export default {
    head(){
      return{
        script:[
      { 
        hid: 'spotify', src: "https://sdk.scdn.co/spotify-player.js" , defer: true,
        // callback: () => { this.spotifyLoaded = true 
        // console.log(this.spotifyLoaded)}
      }
    ],
      }
    },
    data(){
        return{
            player: "",
            spotifyLoaded: false,
        }
    },
    mounted(){
        window.onSpotifyWebPlaybackSDKReady = () => {
        const token = process.env.SPOTIFY_KEY;
        const player = new Spotify.Player({
            name: 'Zernonia',
            getOAuthToken: cb => { cb(token); }
        });

        player.addListener('initialization_error', ({ message }) => { console.error(message); });
        player.addListener('authentication_error', ({ message }) => { console.error(message); });
        player.addListener('account_error', ({ message }) => { console.error(message); });
        player.addListener('playback_error', ({ message }) => { console.error(message); });

        // Playback status updates
        player.addListener('player_state_changed', state => { console.log(state); });

        // Ready
        player.addListener('ready', ({ device_id }) => {
          console.log('Ready with Device ID', device_id);
        });

        // Not Ready
        player.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id);
        });

        // Connect to the player!
        player.connect();

        const play = ({
          spotify_uri,
          playerInstance: {
            _options: {
              getOAuthToken,
              id
            }
          }
        }) => {
          getOAuthToken(access_token => {
            fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
              method: 'PUT',
              body: JSON.stringify({ uris: [spotify_uri] }),
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
              },
            });
            console.log("sucess")
          });
        };

        play({
          playerInstance: player,
          spotify_uri: 'spotify:track:7xGfFoTpQ2E7fRF5lN10tr',
        });
    }}
    
}
</script>

<style>

</style>