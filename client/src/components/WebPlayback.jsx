import React, { useState, useEffect } from 'react';
import { startPlayback } from '../utils/playbackController';

function WebPlayback({ token, playlist }) {
    const [player, setPlayer] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const [currentTrack, setCurrentTrack] = useState({
        name: "Track Name",
        album: { images: [{ url: "" }] },
        artists: [{ name: "Artist Name" }],
    });

    useEffect(() => {
        if (token) {
            const script = document.createElement("script");
            script.src = "https://sdk.scdn.co/spotify-player.js";
            script.async = true;
        
            document.body.appendChild(script);
        
            window.onSpotifyWebPlaybackSDKReady = () => {
                const player = new Spotify.Player({
                    name: 'Web Playback SDK Quick Start Player',
                    getOAuthToken: cb => { cb(token); },
                    volume: 0.5
                });
            
                player.connect().then(success => {
                    if (success) {
                        console.log('The Web Playback SDK successfully connected to Spotify!');
                    }
                });
            
                player.addListener('ready', ({ device_id }) => {
                    console.log('Ready with Device ID', device_id);
                });
            
                player.addListener('not_ready', ({ device_id }) => {
                    console.log('Device ID has gone offline', device_id);
                });
            
                player.addListener('player_state_changed', (state) => {
                    if (!state) {
                        return;
                    }
                    setCurrentTrack(state.track_window.current_track);
                    setIsPaused(state.paused);
                    setIsPlaying(!state.paused); 
                });
    
                setPlayer(player);
            };
        }
    }, [token]);

    const handlePlayPause = () => {
        if (player) {
            if (playlist && !isPlaying) {
                player.getCurrentState().then(state => {
                    if (!state) {
                        console.error('Player state not found');
                        return;
                    }
    
                    const deviceId = state.device_id;
    
                    startPlayback(token, deviceId, playlist)
                        .then(response => {
                            console.log('Playback started:', response);
                        })
                        .catch(error => {
                            console.error('Error starting playback:', error);
                        });
                });
            } else {
                player.togglePlay();
            }
        }
    };
    
    const handleNext = () => {
        if (player) {
            player.nextTrack();
        }
    };
    
    const handlePrev = () => {
        if (player) {
            player.previousTrack();
        }
    };

    return (
        <div>
            <button onClick={handlePrev}>Previous</button>
            <button onClick={handlePlayPause}>{isPaused ? 'Play' : 'Pause'}</button>
            <button onClick={handleNext}>Next</button>
        </div>
    );
}

export default WebPlayback;
