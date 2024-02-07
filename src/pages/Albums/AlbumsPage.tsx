import { useQuery } from "@tanstack/react-query";
import { Box } from "@mui/material";
import { CategorySection, SkeletonCategoryCard } from "@components/CategorySection";
import { getAlbumsCategory, getAlbumsData } from "@services/trendingAlbumsExplore";

export const AlbumsPage = () => {
  const albumsQuery = useQuery({
    queryKey: ["Albums"],
    queryFn: async () => {
      const albumsData = await getAlbumsData();
      const filterAlbumList = getAlbumsCategory(albumsData.albums.items);
      return {
        filterAlbumList: filterAlbumList,
      };
    },
    refetchOnWindowFocus: false,
  });

  return (
    <Box>
      {albumsQuery.isLoading && <SkeletonCategoryCard limit={20} />}
      {albumsQuery.isSuccess && albumsQuery.data.filterAlbumList && (
        <CategorySection
          title="Browse popular playlists"
          categoriesItems={albumsQuery.data.filterAlbumList}
          routePath="albums"
        />
      )}
    </Box>
  );
};
