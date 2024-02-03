import { ProgressSlider } from "@components/ProgessSlider";
import { VerticalCardDetails } from "@components/SongCard/VerticalCardDetails";
import { SongController } from "@components/SongController";
import { VolumeController } from "@components/VolumeController";
import { ICommonPropsDataSharingDTO } from "@dto/commonDTO";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useAppStore } from "@store/store";
import { useAudioPlayer } from "./useAudioPlayer";

interface IAudioPlayerProps {
  tracksDetails: ICommonPropsDataSharingDTO[];
}

const getVerticalCardPropsDataPattern = (data: ICommonPropsDataSharingDTO) => {
  const playingsongId = data.id;
  const title = data.title;
  const subDetails1 = data.artists;
  const subDetails2 = [`${data.release_year}`];
  const subDetails3 = [`${data.album}`];

  return {
    playingsongId,
    title,
    subDetails1,
    subDetails2,
    subDetails3,
  };
};

export const AudioPlayer = (props: IAudioPlayerProps) => {
  const { tracksDetails } = props;
  const { audioLevel, isAudioMuted, currentTrack, setIsAudioMuted } = useAppStore();
  const {
    isPlaying,
    audioRef,
    progress,
    nextTrackHandler,
    prevTrackHandler,
    formatDuration,
    progressChangeHandler,
    playPauseHandler,
    volumeChangeHandler,
  } = useAudioPlayer({ tracksDetails });

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
      className={"absolute top-full left-0 bg-gray-700 z-10 flex-wrap"}
      key={tracksDetails[currentTrack].url}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          width: "100%",
          marginTop: "0.5rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
              {formatDuration(audioRef.current.currentTime).toString().split(".")[0]} /
              {formatDuration(audioRef.current.duration).toString().split(".")[0]}
            </Typography>
          </Box>
        </Box>

        <CardContent
          className="flex gap-8 grow justify-center"
          sx={{
            padding: "0 1rem",
            alignItems: "center",
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: 50, height: 50 }}
            image={tracksDetails[currentTrack].image}
            alt={tracksDetails[currentTrack].title}
          />
          <VerticalCardDetails
            valueDeatils={getVerticalCardPropsDataPattern(tracksDetails[currentTrack])}
          />
          {/* <Box>
            <Typography component="div" variant="h6" noWrap sx={{}}>
              {tracksDetails[currentTrack].title}
            </Typography>
            <Box className="flex flex-wrap mb-1">
              {tracksDetails[currentTrack].artists.map((details, i) => {
                return (
                  <Typography
                    key={i}
                    variant="caption"
                    className="p-1"
                    sx={{
                      color: "gray",
                      fontWeight: 500,
                    }}
                  >
                    {details.name}
                    {i !== tracksDetails[currentTrack].artists.length - 1 ? ", " : ""}
                  </Typography>
                );
              })}

              <MiddleDot />
              <Typography
                variant="caption"
                className="p-1"
                sx={{
                  color: "gray",
                  fontWeight: 500,
                }}
              >
                {tracksDetails[currentTrack].album}
              </Typography>
              <MiddleDot />

              <Typography
                variant="caption"
                className="p-1"
                sx={{
                  color: "gray",
                  fontWeight: 500,
                }}
              >
                {getReleaseYearValue(tracksDetails[currentTrack].release_year)}
              </Typography>
            </Box>
          </Box> */}
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
  );
};
