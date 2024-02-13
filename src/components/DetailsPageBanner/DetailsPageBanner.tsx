import { Box, Button, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { MiddleDot } from "@components/CenterDot";
import { useBannerDetailsPage } from "./useBannerDetailsPage";
// import { LazyLoadImage } from "react-lazy-load-image-component";

interface IBannerDetails {
  imageUrl: string;
  name: string;
  subText1: string | string[];
  subText2: string | string[];
  subText3?: string | string[];
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
    <Box
      className="flex items-center w-full"
      sx={{
        flexDirection: {
          xs: "column",
          sm: "row",
        },
        marginBottom: {
          xs: "1rem",
          sm: "2rem",
        },
      }}
    >
      <Box
        sx={{
          width: {
            xs: "100%",
            sm: "20rem",
          },
          padding: {
            xs: "0.5rem 1rem",
            sm: "1rem 2rem",
          },
          height: {
            xs: "15rem",
          },
        }}
      >
        <img
          src={imageUrl}
          alt={name}
          className="rounded"
          style={{
            width: "100%",
            height: "inherit",
          }}
        />
      </Box>
      <Box
        sx={{
          marginTop: "1rem",
          flexGrow: 2,
          width: {
            xs: "100%",
            sm: "13rem",
          },
          padding: {
            xs: "1rem 1rem",
            sm: "1rem 2rem",
          },
        }}
      >
        <Box>
          <Typography
            variant="h4"
            className="p-1 md:p-2"
            sx={{
              fontWeight: "bold",
              ...animationHeading,
            }}
          >
            {name}
          </Typography>
          <SubTextStyle variant="body1">{subText1}</SubTextStyle>
        </Box>
        <Box className="flex gap-1 md:gap-5 flex-wrap content-center">
          <SubTextStyle variant="body2">{subText2}</SubTextStyle>
          {subText3 && subText3.length > 0 && <MiddleDot />}
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
