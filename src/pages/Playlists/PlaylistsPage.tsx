import { CategorySection, SkeletonCategoryCard } from "@components/CategorySection";
import { Box } from "@mui/material";
import { getPlaylistCategory, getPlaylistsData } from "@services/trendingPlaylistsExplore";
// import { useAppStore } from "@store/store";
import { useQuery } from "@tanstack/react-query";

export const PlaylistsPage = () => {
  //   const { setOpenPlaylist } = useAppStore();
  const playlistsQuery = useQuery({
    queryKey: ["playlists"],
    queryFn: async () => {
      const playlistsData = await getPlaylistsData(25);
      return playlistsData;
    },
    refetchOnWindowFocus: false,
  });

  return (
    <Box>
      {playlistsQuery.isLoading && <SkeletonCategoryCard limit={20} />}
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
