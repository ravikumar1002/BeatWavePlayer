import { PlaylistCard } from "@components/PlaylistCard";
import { ICommonCategoryCardProps } from "@dto/commonDTO";
import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router";

interface ICategorySection {
  title: string;
  categoriesItems: ICommonCategoryCardProps[];
  routePath: string;
}

export const CategorySection = (props: ICategorySection) => {
  const { title, categoriesItems, routePath } = props;
  const navigate = useNavigate();

  return (
    <Box className="p-6">
      <Box className="mb-5">
        <Typography variant="h4" component="div">
          {title}
        </Typography>
      </Box>
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} className="p-4">
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
            sx={{
              "& .MuiGrid-item": {
                background: "orange",
                paddingLeft: {
                  sm: 4,
                  md: 6,
                  lg: 8,
                },
                paddingTop: {
                  sm: 4,
                  md: 6,
                  lg: 8,
                },
              },
            }}
          >
            <PlaylistCard details={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
