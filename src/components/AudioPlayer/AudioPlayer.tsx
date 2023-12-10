import { Box } from "@mui/material";
import { useRef } from "react";
import { useState } from "react";

const AudioPlayer = ({ playlist }) => {

    const [currentTrack, setCurrentTrack] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);

    const audioRef = useRef(new Audio(playlist[currentTrack].url));

    const playPauseHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const nextTrackHandler = () => {
        setCurrentTrack((prevTrack) => (prevTrack + 1) % playlist.length);
        setIsPlaying(true);
    };

    const volumeChangeHandler = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        audioRef.current.volume = newVolume;
    };

    const prevTrackHandler = () => {
        setCurrentTrack((prevTrack) =>
            prevTrack === 0 ? playlist.length - 1 : prevTrack - 1
        );
        setIsPlaying(true);
    };

    return (
        <Box>
            <h3>{playlist[currentTrack].title}</h3>
            <audio ref={audioRef} src={playlist[currentTrack].url} volume={volume} />
            <div>
                <button onClick={prevTrackHandler}>Previous</button>
                <button onClick={playPauseHandler}>
                    {isPlaying ? 'Pause' : 'Play'}
                </button>
                <button onClick={nextTrackHandler}>Next</button>
            </div>
            <div>
                <label>Volume:</label>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={volumeChangeHandler}
                />
            </div>
        </Box>
    )
}

export default AudioPlayer