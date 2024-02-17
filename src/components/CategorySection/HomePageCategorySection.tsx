import { PlaylistCard } from "@components/PlaylistCard";
import { ICommonCategoryCardProps } from "@dto/commonDTO";
import { Box, Grid, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface IHomePageCategorySection {
  title: string;
  categoriesItems: ICommonCategoryCardProps[];
  routePath: string;
}

export const HomePageCategorySection = (props: IHomePageCategorySection) => {
  const { title, categoriesItems, routePath } = props;
  const navigate = useNavigate();
  return (
    <Box className="px-3 py-1 pb-2">
      <Box className="mb-2 flex justify-between">
        <Typography variant="h5" component="div" fontWeight={600}>
          {title}
        </Typography>
        <Typography variant="body1" component="div">
          <Link
            onClick={() => {
              navigate(`${routePath}`);
            }}
          >
            View More
          </Link>
        </Typography>
      </Box>
      <Grid container spacing={4} className="p-4">
        {categoriesItems.map((item) => (
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            lg={2}
            xl={2}
            columnSpacing={2}
            key={item._id}
            onClick={() => {
              navigate(`/${routePath}/${item._id}`);
            }}
          >
            <PlaylistCard details={item} />
          </Grid>
        ))}
      </Grid>
      <Box className="flex flex-wrap gap-4"></Box>
    </Box>
  );
};
