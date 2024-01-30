import { MiddleDot } from "@components/CenterDot";
import { Box, Typography, styled } from "@mui/material";

const SubTextCard = styled(
  Typography,
  {}
)(() => ({
  color: "gray",
  fontWeight: 500,
  padding: "0.25rem",
}));

interface IValueDeatils {
  playingsongId: string | null;
  title: string;
  id: string;
  SubDeatils1: string[];
  SubDeatils2: string[];
  SubDeatils3: string[];
}

interface IverticalCardDetails {
  valueDeatils: IValueDeatils;
}

export const SubTextloopComponent = ({ SubDeatils }: { SubDeatils: string[] }) => {
  return (
    <>
      {SubDeatils.map((sub, i) => (
        <SubTextCard key={i} variant="caption">
          {sub}
          {i !== SubDeatils.length - 1 ? ", " : ""}
        </SubTextCard>
      ))}
    </>
  );
};

export const VerticalCardDetails = (props: IverticalCardDetails) => {
  const { playingsongId, id, title, SubDeatils1, SubDeatils2, SubDeatils3 } = props.valueDeatils;
  console.log(playingsongId, id, title, SubDeatils1, SubDeatils2, SubDeatils3, "deatils");
  return (
    <Box>
      <Typography
        variant="subtitle2"
        className="p-1"
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
        {SubDeatils1 && <SubTextloopComponent SubDeatils={SubDeatils1} />}
        {SubDeatils2.length > 0 && <MiddleDot />}
        {SubDeatils2 && <SubTextloopComponent SubDeatils={SubDeatils2} />}
        {SubDeatils3.length > 0 && <MiddleDot />}
        {SubDeatils3 && <SubTextloopComponent SubDeatils={SubDeatils3} />}
      </Box>
    </Box>
  );
};
