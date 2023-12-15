import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useRef } from "react";
import { useState, useEffect } from "react";

import { useAppStore } from "../../store/store";
import ProgressSlider from "../ProgessSlider/ProgressSlider";
import VolumeController from "../VolumeController/VolumeController";
import SongController from "../SongController/SongController";
interface Track {
    title: string;
    url: string;
    image: string,
}

interface IAudioPlayerProps {
    playlist: Track[];
}

const AudioPlayer = (props: IAudioPlayerProps) => {

    const { playlist } = props

    const { audioLevel, isAudioMuted, currentTrack, setAudioLevel, setIsAudioMuted, setCurrentTrack } = useAppStore()
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const audioRef = useRef(new Audio(playlist[currentTrack]?.url));

    const songPlayHandler = (songsList: Track[], playingTrak: number, audioRef: React.MutableRefObject<HTMLAudioElement>, setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>) => {
        const trackURL = songsList[playingTrak]?.url ? songsList[playingTrak]?.url : ""
        audioRef.current.src = trackURL;
        setTimeout(() => {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    setIsPlaying(true);
                })
                    .catch(error => {
                        console.log(error)
                        setIsPlaying(false);
                    });
            }
            setIsPlaying(true);
        }, 0)
    }

    useEffect(() => {
        const updateProgress = () => {
            const currentTime = audioRef.current.currentTime;
            const duration = audioRef.current.duration;
            const progressPercentage = (currentTime / duration) * 100 || 0;
            setProgress(progressPercentage);
        };

        const handleEnded = () => {
            nextTrackHandler();
        };

        audioRef.current.addEventListener('timeupdate', updateProgress);
        audioRef.current.addEventListener('ended', handleEnded);

        return () => {
            audioRef.current.removeEventListener('timeupdate', updateProgress);
            audioRef.current.removeEventListener('ended', handleEnded);
        };
    }, [currentTrack]);

    useEffect(() => {
        songPlayHandler(playlist, currentTrack, audioRef, setIsPlaying)
    }, [currentTrack])

    const playPauseHandler = (): void => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };


    const nextTrackHandler = (): void => {
        const trackNumber = (currentTrack + 1) % playlist.length
        setCurrentTrack(trackNumber);
        songPlayHandler(playlist, trackNumber, audioRef, setIsPlaying)
    };

    const prevTrackHandler = (): void => {
        const trackNumber = currentTrack === 0 ? playlist.length - 1 : currentTrack - 1
        setCurrentTrack(trackNumber);
        songPlayHandler(playlist, trackNumber, audioRef, setIsPlaying)
    };

    const volumeChangeHandler = (e: number | number[]): void => {
        const newVolume = parseFloat(e.toString());
        setAudioLevel(newVolume)
        if (newVolume === 0) {
            setIsAudioMuted(true)
        } else {
            setIsAudioMuted(false)
        }
        audioRef.current.volume = newVolume;
    };

    const progressChangeHandler = (e: number | number[]) => {
        const newProgress = parseFloat(e.toString());
        const newTime = (newProgress / 100) * audioRef.current.duration;
        setProgress(newProgress);
        console.log(newProgress, newTime)
        audioRef.current.currentTime = newTime;

        if (isNaN(newTime)) {
            nextTrackHandler()
        }
    };

    function formatDuration(value: number) {
        const minute = Math.floor(value / 60);
        const secondLeft = value - minute * 60;
        if (isNaN(minute) || isNaN(secondLeft)) {
            return "0:00"
        }
        return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
    }


    return (
        <Card sx={{ display: 'flex', flexDirection: "column", justifyContent: "center" }} className={"sticky bottom-0 bg-gray-700 z-10 flex-wrap"} key={playlist[currentTrack].url}>
            <Box sx={{ display: 'flex', flexWrap: "wrap", justifyContent: 'space-around', width: '100%', marginTop: "0.5rem" }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mt: -1,
                    }}
                >
                    <SongController
                        isPlaying={isPlaying}
                        prevTrackHandler={prevTrackHandler}
                        playPauseHandler={playPauseHandler}
                        nextTrackHandler={nextTrackHandler}
                    />
                    <Box className="flex justify-between ml-2">
                        <Typography variant="body2">
                            {formatDuration(audioRef.current.currentTime).toString().split(".")[0]} / {formatDuration(audioRef.current.duration).toString().split(".")[0]}
                        </Typography>
                    </Box>
                </Box>

                <CardContent className="flex gap-8 grow justify-center" sx={{
                    padding: "0 1rem",
                    alignItems: "center"
                }}>
                    <CardMedia
                        component="img"
                        sx={{ width: 50, height: 50 }}
                        image={playlist[currentTrack].image}
                        alt={playlist[currentTrack].title}
                    />
                    <Box>
                        <Typography component="div" variant="h6" noWrap>
                            {playlist[currentTrack].title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div" noWrap>
                            Mac Miller
                        </Typography>
                    </Box>
                </CardContent>
                <VolumeController
                    isAudioMuted={isAudioMuted}
                    audioRef={audioRef}
                    audioLevel={audioLevel}
                    setIsAudioMuted={setIsAudioMuted}
                    volumeChangeHandler={volumeChangeHandler}
                />
            </Box>
            <ProgressSlider sliderValue={progress} sliderFunction={progressChangeHandler} />
        </Card>
    )
}

export default AudioPlayer