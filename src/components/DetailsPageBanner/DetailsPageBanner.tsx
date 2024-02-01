import { Box, Button, Typography } from "@mui/material";
import { keyframes } from "@mui/system";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

interface IBannerDetails {
  imageUrl: string;
  name: string;
  description: string;
  itemsLength: number;
  followers: number;
}

interface IDetailsPageBanner {
  bannerDetails: IBannerDetails;
  onClick: () => void;
}

export const DetailsPageBanner = (props: IDetailsPageBanner) => {
  const { bannerDetails, onClick } = props;
  const { imageUrl, name, description, itemsLength, followers } = bannerDetails;

  const detailsPageBannerAnimation = keyframes`
    100% {
      transform: translate(0px);
  }`;

  const animationHeading = {
    animationDuration: "0.3s",
    animationFillMode: "forwards",
    display: "block",
    animationName: `${detailsPageBannerAnimation}`,
    transform: "translateY(100%)",
    animationPlayState: "running",
  };

  return (
    <Box className="flex items-center w-full">
      <Box
        sx={{
          width: "20rem",
          padding: "1rem 2rem",
        }}
      >
        <img src={imageUrl} alt={name} className="rounded" />
      </Box>
      <Box
        sx={{
          marginTop: "1rem",
          flexGrow: 2,
          width: "13rem",
        }}
      >
        <Box>
          <Typography
            variant="h4"
            className="p-2"
            sx={{
              fontWeight: "bold",
              ...animationHeading,
            }}
          >
            {name}
          </Typography>
          <Typography
            variant="body1"
            className="p-2"
            sx={{
              color: "gray",
              fontWeight: 500,
              ...animationHeading,
            }}
          >
            {description}
          </Typography>
        </Box>
        <Box className="flex gap-5 flex-wrap">
          <Typography
            variant="body2"
            className="p-2"
            sx={{
              color: "gray",
              fontWeight: 500,
              ...animationHeading,
            }}
          >
            {itemsLength} Songs
          </Typography>
          <Typography
            variant="body2"
            className="p-2"
            sx={{
              color: "gray",
              fontWeight: 500,
              ...animationHeading,
            }}
          >
            {followers} followers
          </Typography>
        </Box>
        <Box className="ml-12 mt-4">
          {
            <Button
              type="button"
              variant="contained"
              startIcon={<PlayArrowIcon />}
              onClick={() => {
                onClick();
              }}
              sx={{
                background: "purple",
              }}
            >
              Play All
            </Button>
          }
        </Box>
      </Box>
    </Box>
  );
};
