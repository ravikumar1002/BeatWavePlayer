import { ICommonPropsDataSharingDTO } from "@dto/CommonDTO";
import { useAppStore } from "@store/store";
import { useEffect, useRef, useState } from "react";

interface IUseAudioPlayerProps {
    tracksDetails: ICommonPropsDataSharingDTO[]
}

export const useAudioPlayer = (props: IUseAudioPlayerProps) => {
    const { tracksDetails } = props;

    const {
        playingsongId,
        currentTrack,
        setAudioLevel,
        setIsAudioMuted,
        setCurrentTrack,
        setPlayingSongId,
    } = useAppStore();

    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const audioRef = useRef(new Audio(tracksDetails[currentTrack]?.url));


    const songPlayHandler = (
        songsList: ICommonPropsDataSharingDTO[],
        playingTrak: number,
        audioRef: React.MutableRefObject<HTMLAudioElement>,
        setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        const trackURL = songsList[playingTrak]?.url
            ? songsList[playingTrak]?.url
            : "";
        audioRef.current.src = trackURL;
        setTimeout(() => {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        setIsPlaying(true);
                    })
                    .catch((error) => {
                        console.log(error);
                        setIsPlaying(false);
                    });
            }
            setIsPlaying(true);
        }, 0);
    };


    const nextTrackHandler = (): void => {
        const trackNumber = (currentTrack + 1) % tracksDetails.length;
        setCurrentTrack(trackNumber);
        songPlayHandler(tracksDetails, trackNumber, audioRef, setIsPlaying);
    };

    const prevTrackHandler = (): void => {
        const trackNumber =
            currentTrack === 0 ? tracksDetails.length - 1 : currentTrack - 1;
        setCurrentTrack(trackNumber);
        songPlayHandler(tracksDetails, trackNumber, audioRef, setIsPlaying);
    };

    const volumeChangeHandler = (e: number | number[]): void => {
        const newVolume = parseFloat(e.toString());
        setAudioLevel(newVolume);
        if (newVolume === 0) {
            setIsAudioMuted(true);
        } else {
            setIsAudioMuted(false);
        }
        audioRef.current.volume = newVolume;
    };

    const progressChangeHandler = (e: number | number[]) => {
        const newProgress = parseFloat(e.toString());
        const newTime = (newProgress / 100) * audioRef.current.duration;
        setProgress(newProgress);
        audioRef.current.currentTime = newTime;

        if (isNaN(newTime)) {
            nextTrackHandler();
        }
    };

    const playPauseHandler = (): void => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const formatDuration = (value: number) => {
        const minute = Math.floor(value / 60);
        const secondLeft = value - minute * 60;
        if (isNaN(minute) || isNaN(secondLeft)) {
            return "0:00";
        }
        return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
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

        audioRef.current.addEventListener("timeupdate", updateProgress);
        audioRef.current.addEventListener("ended", handleEnded);

        return () => {
            audioRef.current.removeEventListener("timeupdate", updateProgress);
            audioRef.current.removeEventListener("ended", handleEnded);
        };
    }, [currentTrack, playingsongId]);

    useEffect(() => {
        songPlayHandler(tracksDetails, currentTrack, audioRef, setIsPlaying);
        setPlayingSongId(tracksDetails[currentTrack].id);
    }, [currentTrack, playingsongId]);


    return {
        isPlaying, audioRef, progress, songPlayHandler, nextTrackHandler, prevTrackHandler, formatDuration, progressChangeHandler, playPauseHandler, volumeChangeHandler
    }
}