import { Box, Button, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { MiddleDot } from "@components/CenterDot";
import { useBannerDetailsPage } from "./useBannerDetailsPage";

interface IBannerDetails {
  imageUrl: string;
  name: string;
  subText1: string;
  subText2: string;
  subText3?: string;
}
interface IDetailsPageBanner {
  bannerDetails: IBannerDetails;
  onClick: () => void;
}

export const DetailsPageBanner = (props: IDetailsPageBanner) => {
  const { bannerDetails, onClick } = props;
  const { imageUrl, name, subText1, subText2, subText3 } = bannerDetails;

  const { SubTextStyle, animationHeading } = useBannerDetailsPage();

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
          <SubTextStyle variant="body1">{subText1}</SubTextStyle>
        </Box>
        <Box className="flex gap-5 flex-wrap content-center">
          <SubTextStyle variant="body2">{subText2}</SubTextStyle>
          {subText2.length > 0 && <MiddleDot />}
          <SubTextStyle variant="body2">{subText3}</SubTextStyle>
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
