import { CategorySection, SkeletonCategoryCard } from "@components/CategorySection";
import { CategoryDTO, CategoryItem } from "@dto/categoryDTO";
import { Box } from "@mui/material";
import { GetSpotifyDataAsJSON } from "@services/getApiData";
// import { useAppStore } from "@store/store";
import { useQuery } from "@tanstack/react-query";

export const PlaylistsPage = () => {
  //   const { setOpenPlaylist } = useAppStore();

  const getPlaylistsData = async () => {
    const trendingResponse = await GetSpotifyDataAsJSON<CategoryDTO>(
      `browse/featured-playlists?limit=24`,
      {
        params: {},
      },
    );
    return trendingResponse;
  };

  const playlistsQuery = useQuery({
    queryKey: ["playlists"],
    queryFn: async () => {
      const playlistsData = await getPlaylistsData();
      return playlistsData;
    },
    refetchOnWindowFocus: false,
  });

  const getPlaylistCategory = (categories: CategoryItem[]) => {
    const filterData = categories.map((item) => ({
      _id: item.id,
      image: item.images[0].url,
      name: item.name,
      description: item.description,
    }));
    return filterData;
  };

  return (
    <Box>
      {playlistsQuery.isLoading && <SkeletonCategoryCard />}
      {playlistsQuery.isSuccess && playlistsQuery.data?.playlists.items && (
        <CategorySection
          title="Browse popular playlists"
          categoriesItems={getPlaylistCategory(playlistsQuery.data.playlists.items)}
          routePath="playlist"
        />
      )}
    </Box>
  );
};
