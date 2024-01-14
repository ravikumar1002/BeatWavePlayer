import {
  FastForwardRounded,
  FastRewindRounded,
  PauseRounded,
  PlayArrowRounded,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";

interface ISongController {
  isPlaying: boolean;
  prevTrackHandler: () => void;
  playPauseHandler: () => void;
  nextTrackHandler: () => void;
}

export const SongController = (props: ISongController) => {
  const { isPlaying, prevTrackHandler, playPauseHandler, nextTrackHandler } =
    props;
  return (
    <>
      <IconButton aria-label="previous song" onClick={prevTrackHandler}>
        <FastRewindRounded fontSize="large" />
      </IconButton>
      <IconButton
        aria-label={isPlaying ? "play" : "pause"}
        onClick={playPauseHandler}
      >
        {isPlaying ? (
          <PauseRounded sx={{ fontSize: "3rem" }} />
        ) : (
          <PlayArrowRounded sx={{ fontSize: "3rem" }} />
        )}
      </IconButton>
      <IconButton aria-label="next song" onClick={nextTrackHandler}>
        <FastForwardRounded fontSize="large" />
      </IconButton>
    </>
  );
};
