import { GetSpotifyDataAsJSON } from "@services/getApiData";
import { SearchResultAlbumItems, SearchResultAlbums } from "@dto/searchResultDTO";
import { useQuery } from "@tanstack/react-query";
import { Box } from "@mui/material";
import { CategorySection, SkeletonCategoryCard } from "@components/CategorySection";

export const AlbumsPage = () => {
  const getAlbumsData = async () => {
    const trendingResponse = await GetSpotifyDataAsJSON<{ albums: SearchResultAlbums }>(
      `browse/new-releases?limit=24`,
      {
        params: {},
      },
    );
    return trendingResponse;
  };

  const getAlbumsCategory = (categories: SearchResultAlbumItems[]) => {
    const filterData = categories.map((item) => ({
      _id: item.id,
      image: item.images[0].url,
      name: item.name,
      description: `${item.total_tracks} songs inculded`,
    }));
    return filterData;
  };

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
      {albumsQuery.isLoading && <SkeletonCategoryCard />}
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
