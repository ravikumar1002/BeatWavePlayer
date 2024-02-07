import { SkeletonCategoryCard } from "@components/CategorySection";
import { HomePageCategorySection } from "@components/CategorySection/HomePageCategorySection";
import { SkeletonVerticalSongCard, VerticalSongCard } from "@components/SongCard";
import { Box, Typography } from "@mui/material";
import { getAlbumsCategory, getAlbumsData } from "@services/trendingAlbumsExplore";
import { getPlaylistCategory, getPlaylistsData } from "@services/trendingPlaylistsExplore";
import { getTredingTracksData } from "@services/trendingTracksExplore";
import { useQuery } from "@tanstack/react-query";
import { getPlaylistsTracksItemsArray } from "@utils/getTracksItemsData";
import { getHomeTracksItemsArray } from "@utils/getsTracksTrendingData";

const HomePage = () => {
  const albumsHomeQuery = useQuery({
    queryKey: ["albums_home"],
    queryFn: async () => {
      const albumsData = await getAlbumsData(6);
      const filterAlbumList = getAlbumsCategory(albumsData.albums.items);
      return {
        filterAlbumList: filterAlbumList,
      };
    },
    refetchOnWindowFocus: false,
  });

  const playlistsHomeQuery = useQuery({
    queryKey: ["playlists_home"],
    queryFn: async () => {
      const playlistsData = await getPlaylistsData(6);
      return playlistsData;
    },
    refetchOnWindowFocus: false,
  });

  const tracksHomeQuery = useQuery({
    queryKey: ["tracks_home"],
    queryFn: async () => {
      const playlistsData = await getTredingTracksData(15);
      return {
        tracks: getPlaylistsTracksItemsArray(playlistsData?.tracks.items),
      };
    },
    refetchOnWindowFocus: false,
  });

  return (
    <Box>
      <Box>
        {albumsHomeQuery.isLoading && <SkeletonCategoryCard limit={6} />}
        {albumsHomeQuery.isSuccess && albumsHomeQuery.data.filterAlbumList && (
          <HomePageCategorySection
            title="Browse popular Albums"
            categoriesItems={albumsHomeQuery.data.filterAlbumList}
            routePath="albums"
          />
        )}
      </Box>
      <Box>
        {playlistsHomeQuery.isLoading && <SkeletonCategoryCard limit={6} />}
        {playlistsHomeQuery.isSuccess && playlistsHomeQuery.data?.playlists.items && (
          <HomePageCategorySection
            title="Browse popular Playlists"
            categoriesItems={getPlaylistCategory(playlistsHomeQuery.data.playlists.items)}
            routePath="playlist"
          />
        )}
      </Box>
      <Box className="p-6">
        <Box className="mb-5">
          <Typography variant="h5" component="div" fontWeight={600}>
            {" "}
            Most Listen Songs
          </Typography>
        </Box>
        <Box>
          {tracksHomeQuery.isLoading &&
            Array(8)
              .fill(0)
              .map((_, i) => {
                return <SkeletonVerticalSongCard key={i} />;
              })}
        </Box>
        <Box>
          {tracksHomeQuery.isSuccess &&
            tracksHomeQuery?.data?.tracks &&
            tracksHomeQuery?.data?.tracks.map((item, i) => {
              return <VerticalSongCard key={item.id} songDetails={item} listRank={i} />;
            })}
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
