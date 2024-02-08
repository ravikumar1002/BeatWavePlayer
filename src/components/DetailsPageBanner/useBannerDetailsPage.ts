import { Typography, styled } from "@mui/material";
import { keyframes } from "@mui/system";


export const useBannerDetailsPage = () => {

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

    const SubTextStyle = styled(
        Typography,
        {},
    )(() => ({
        ...animationHeading,
        color: "gray",
        fontWeight: 500,
        padding: "0.5rem",
        
    }));

    return {
        SubTextStyle, animationHeading
    }
}