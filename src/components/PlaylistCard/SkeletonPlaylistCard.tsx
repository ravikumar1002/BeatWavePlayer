import {
  Box,
  CardActionArea,
  Skeleton,
  CardContent,
  Card,
} from "@mui/material";
import "./playlist-card.css";

export const SkeletonPlaylistCard = () => {
  return (
    <Card >
      <CardActionArea>
        <Box
          sx={{
            overflow: "hidden",
          }}
        >
          <Skeleton variant="rectangular" height={140} />
        </Box>

        <CardContent>
          <Skeleton height={30} />
          <Box className="mydiv">
            <Skeleton height={20} />
            <Skeleton height={20} />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
