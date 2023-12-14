import { Box, Card, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import { useRef } from "react";
import { useState, useEffect } from "react";
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';

import { useAppStore } from "../../store/store";
import ProgressSlider from "../ProgessSlider/ProgressSlider";
import VolumeController from "../VolumeController/VolumeController";
interface Track {
    title: string;
    url: string;
    image: string,
}

interface IAudioPlayerProps {
    playlist: Track[];
}

const AudioPlayer = ({ playlist }: IAudioPlayerProps) => {

    const { audioLevel, isAudioMuted, currentTrack, setAudioLevel, setIsAudioMuted, setCurrentTrack } = useAppStore()

    // const [currentTrack, setCurrentTrack] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const [progress, setProgress] = useState<number>(0);

    const audioRef = useRef(new Audio(playlist[currentTrack].url));

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
        // console.log(currentTrack, playlist[currentTrack].url, "currtr")
        console.log(playlist[currentTrack].url, currentTrack)
        audioRef.current.src = playlist[trackNumber].url;
        setTimeout(() => {
            const playPromise = audioRef.current.play();
            console.log(trackNumber, "zxc")

            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    setIsPlaying(true);
                })
                    .catch(error => {
                        console.log(error)
                        setIsPlaying(false);
                    });
            }
            setIsPlaying(true);
        }, 0)
    };

    const prevTrackHandler = (): void => {
        const treackNumber = currentTrack === 0 ? playlist.length - 1 : currentTrack - 1
        setCurrentTrack(treackNumber);
        audioRef.current.src = playlist[treackNumber].url;
        setTimeout(() => {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    setIsPlaying(true);
                })
                    .catch(error => {
                        console.log(error)
                        setIsPlaying(false);
                    });
            }
            setIsPlaying(true);
        }, 0)
    };

    const volumeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const newVolume = parseFloat(e.target.value);
        // setVolume(newVolume);
        setAudioLevel(newVolume)
        audioRef.current.volume = newVolume;
    };

    const progressChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const newProgress = parseFloat(e.target.value);
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
        <Card sx={{ display: 'flex', flexDirection: "column", justifyContent: "center" }} className={"sticky bottom-0 bg-gray-700 z-10"} key={playlist[currentTrack].url}>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginTop: "0.5rem" }}>
                {/* <audio ref={audioRef} preload="
            none" src={playlist[currentTrack].url} volume={volume} /> */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mt: -1,
                    }}
                >
                    <IconButton aria-label="previous song" onClick={prevTrackHandler} >
                        <FastRewindRounded fontSize="large" />
                    </IconButton>
                    <IconButton
                        aria-label={isPlaying ? 'play' : 'pause'}
                        onClick={playPauseHandler}
                    >
                        {isPlaying ? <PauseRounded sx={{ fontSize: '3rem' }} /> :
                            <PlayArrowRounded
                                sx={{ fontSize: '3rem' }}
                            />
                        }
                    </IconButton>
                    <IconButton aria-label="next song" onClick={nextTrackHandler}>
                        <FastForwardRounded fontSize="large" />
                    </IconButton>
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