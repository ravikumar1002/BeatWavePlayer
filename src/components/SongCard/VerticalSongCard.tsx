import { Box, Typography, SxProps } from "@mui/material";
import { keyframes } from "@mui/system";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import PlayArrowSharpIcon from "@mui/icons-material/PlayArrowSharp";
import { useAppStore } from "@store/store";
import { VerticalCardDetails } from "./VerticalCardDetails";
import { ICommonPropsDataSharingDTO } from "@dto/commonDTO";

interface IVerticalSongCardProps {
  songDetails: ICommonPropsDataSharingDTO[];
  listRank: number;
}

const styles: Record<string, SxProps> = {
  imageIconHover: {
    position: "absolute",
    background: "#aca4a45e",
    top: 0,
    right: 0,
    width: "100%",
    height: "100%",
    translate: "50% 50%,",
    color: "purple",
    padding: "1rem",
  },
  verticalSongContainer: {
    "&:hover": {
      color: "purple",
      cursor: "pointer",
      transform: "scale(0.995)",
      transition: " transform .2s",
      zoom: "initial",
      "& .play": {
        visibility: "visible",
        zIndex: "10",
        background: "#aca4a45e",
      },
    },
  },
};

export const VerticalSongCard = (props: IVerticalSongCardProps) => {
  const { title, image, id, artists, release_year, album, url } = props.songDetails;
  const { playingsongId, openPlaylist, setCurrentTrack, setPlaylistSongs } = useAppStore();

  const dDzoI = keyframes`
        0% {
            opacity: 0;
        }   
        100% {
            opacity: 1;
        }`;

  const cardAnimation = {
    animationDuration: "0.7s",
    animationDelay: "0.25s",
    animationFillMode: "both",
    animationName: `${dDzoI}`,
  };

  return (
    <Box sx={styles.verticalSongContainer}>
      <Box
        className="w-full flex p-6 bg-white"
        sx={{
          ...cardAnimation,
          marginTop: "0.5rem",
          borderRadius: "10px",
        }}
        onClick={() => {
          setPlaylistSongs(props.songDetails);
          setCurrentTrack(props.listRank);
        }}
      >
        <Box
          className="flex gap-10 w-1/6"
          sx={{
            alignItems: "center",
            borderRadius: "5px",
          }}
        >
          <Box className="relative">
            <img
              src={image}
              alt={title}
              style={{
                height: "96px",
                width: "96px",
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />
            {playingsongId === id && <GraphicEqIcon fontSize="small" sx={styles.imageIconHover} />}
            {playingsongId !== id && (
              <PlayArrowSharpIcon
                fontSize="small"
                sx={{
                  ...styles.imageIconHover,
                  visibility: "hidden",
                }}
                className="play"
              />
            )}
          </Box>
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: `${playingsongId === id && "maroon"}`,
              }}
            >
              {props.listRank + 1}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            flexGrow: 2,
          }}
        >
          <VerticalCardDetails
            valueDeatils={{
              playingsongId,
              title,
              id,
              subDetails1: artists,
              subDetails2: release_year ? [release_year] : [],
              subDetails3: album ? [album] : [],
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
