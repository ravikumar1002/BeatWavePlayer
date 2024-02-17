import {
  Box,
  CardActionArea,
  SxProps,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import "./playlist-card.css";
import { ICommonCategoryCardProps } from "@dto/commonDTO";

interface IPlaylistCardProps {
  details: ICommonCategoryCardProps;
}

const styles: Record<string, SxProps> = {
  wrapper: {
    cursor: "pointer",
    "&:hover": {
      "& .image-container": {
        transform: "scale(1.1)",
        transition: "transform .4s",
      },
    },
  },
};

export const PlaylistCard = (props: IPlaylistCardProps) => {
  const { image, name, description } = props.details;
  return (
    <Card sx={styles.wrapper}>
      {/* <CardActionArea> */}
      <Box
        sx={{
          overflow: "hidden",
        }}
      >
        <CardMedia
          component="img"
          image={image}
          alt={name}
          className="image-container"
          loading="lazy"
        />
      </Box>

      <CardContent
        sx={{
          padding: {
            xs: "0.5rem",
            sm: "1rem",
          },
          "& .css-1d6y1ul-MuiCardContent-root:last-child": {
            paddingBottom: 0,
          },
        }}
      >
        <Typography
          variant="subtitle2"
          component="div"
          fontWeight={"800"}
          sx={{
            lineBreak: "anywhere",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {name}
        </Typography>
        <Box className="mydiv">
          <Typography
            variant="subtitle2"
            color="text.secondary"
            className="mytext"
            sx={{
              fontSize: "0.8rem",
            }}
          >
            {description}
          </Typography>
          <Box color="text.secondary" className="myelli">
            ...
          </Box>
        </Box>
      </CardContent>
      {/* </CardActionArea> */}
    </Card>
  );
};
