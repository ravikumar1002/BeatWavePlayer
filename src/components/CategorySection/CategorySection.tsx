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
            <PlaylistCard
              details={{
                _id: item._id,
                image: item.image,
                name: item.name,
                description: item.description,
              }}
            />
          </Grid>
        ))}
      </Grid>
      <Box className="flex flex-wrap gap-4"></Box>
    </Box>
  );
};
