import { MiddleDot } from "@components/CenterDot";
import { Box, Typography, styled } from "@mui/material";

const SubTextCard = styled(
  Typography,
  {},
)(() => ({
  color: "gray",
  fontWeight: 500,
  padding: "0.25rem",
}));

interface IValueDetails {
  playingsongId: string | null;
  title: string;
  id?: string;
  subDetails1: string[] | string;
  subDetails2: string[] | string;
  subDetails3: string[] | string;
}

interface IverticalCardDetails {
  valueDeatils: IValueDetails;
}

const SubTextloopComponent = ({ subDetails }: { subDetails: string[] | string }) => {
  if (Array.isArray(subDetails)) {
    return (
      <>
        {subDetails.map((sub, i) => (
          <SubTextCard key={i} variant="caption">
            {sub}
            {i !== subDetails.length - 1 ? ", " : ""}
          </SubTextCard>
        ))}
      </>
    );
  }
  return (
    <>
      <SubTextCard variant="caption">{subDetails}</SubTextCard>
    </>
  );
};

export const VerticalCardDetails = (props: IverticalCardDetails) => {
  const { playingsongId, id, title, subDetails1, subDetails2, subDetails3 } = props.valueDeatils;
  return (
    <Box>
      <Typography
        variant="subtitle2"
        className="p-1"
        noWrap
        sx={{
          fontWeight: 700,
          color: `${playingsongId === id && "maroon"}`,
          "&:hover": {
            color: "inherit",
          },
        }}
      >
        {title}
      </Typography>
      <Box className="flex flex-wrap">
        {subDetails1 && <SubTextloopComponent subDetails={subDetails1} />}
        {subDetails2.length > 0 && <MiddleDot />}
        {subDetails2 && <SubTextloopComponent subDetails={subDetails2} />}
        {subDetails3.length > 0 && <MiddleDot />}
        {subDetails3 && <SubTextloopComponent subDetails={subDetails3} />}
      </Box>
    </Box>
  );
};
