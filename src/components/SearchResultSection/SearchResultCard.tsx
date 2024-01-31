import { Box, SxProps } from "@mui/material";
import { keyframes } from "@mui/system";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import PlayArrowSharpIcon from "@mui/icons-material/PlayArrowSharp";
import { useAppStore } from "@store/store";
import { VerticalCardDetails } from "@components/SongCard/VerticalCardDetails";
import { useNavigate } from "react-router-dom";

export interface ISongDetails {
  title: string;
  image: string;
  id: string;
  artists: string[];
  release_year: string;
  albumName: string;
}

interface ISearchResultCard {
  songDetails: ISongDetails;
  isSong?: boolean;
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

export const SearchResultCard = (props: ISearchResultCard) => {
  const { title, image, id, artists, release_year, albumName } = props.songDetails;
  //   console.log(title, image, id, artists, release_year, albumName);
  const { playingsongId } = useAppStore();
  const navigate = useNavigate();

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
          if (!props?.isSong) navigate(`/playlist/${id}`);
        }}
      >
        <Box className="flex gap-5 w-1/12 items-center rounded">
          <Box className="relative">
            <img src={image} alt={title} className="h-12 w-12 object-cover rounded" />

            {props.isSong && playingsongId === id && (
              <GraphicEqIcon fontSize="small" sx={styles.imageIconHover} />
            )}
            {props.isSong && playingsongId !== id && (
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
              subDetails3: albumName ? [albumName] : [],
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
