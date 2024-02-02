import { Box } from "@mui/material";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { GetSpotifyDataAsJSON } from "@services/getApiData";
import { DetailsPageBanner } from "@components/DetailsPageBanner/DetailsPageBanner";
import { SkeletonVerticalSongCard, VerticalSongCard } from "@components/SongCard";
import { getBannerData } from "@utils/getBannerData";
import { DetailsPageBannerSkeleton } from "@components/DetailsPageBanner/DetailsPageBannerSkeleton";
import { getReleaseYearValue } from "@hooks/getReleaseYearValue";
import { getTracksItemsData } from "@utils/getTracksItemsData";
import { useAppStore } from "@store/store";

export const AlbumDetailsPage = () => {
  const { albumId } = useParams();
  const { setPlaylistSongs, setOpenPlaylist, setCurrentTrack } = useAppStore();

  const getAlbumDetails = async (albumId: string | undefined) => {
    const trendingResponse = await GetSpotifyDataAsJSON(`/albums/${albumId}`, {
      params: {},
    });
    return trendingResponse;
  };

  const AlbumDetailsQuery = useQuery({
    queryKey: ["albumDetails"],
    queryFn: async () => {
      const albumData = await getAlbumDetails(albumId);
      setOpenPlaylist(albumData);
      return albumData;
    },
  });

  console.log(AlbumDetailsQuery.data, AlbumDetailsQuery.isLoading);
  console.log(getBannerData(AlbumDetailsQuery.data));
  return (
    <Box
      sx={{
        background: "azure",
      }}
    >
      {AlbumDetailsQuery.isSuccess && (
        <DetailsPageBanner
          bannerDetails={{
            ...getBannerData(AlbumDetailsQuery.data),
            subText3: getReleaseYearValue(AlbumDetailsQuery?.data?.release_date),
            subText1: AlbumDetailsQuery.data?.artists.map((artist) => artist.name),
          }}
          onClick={() => {
            const tracksItems = getTracksItemsData(AlbumDetailsQuery.data?.tracks.items);
            setPlaylistSongs(tracksItems ? tracksItems : null);
            setCurrentTrack(0);
          }}
        />
      )}
      {AlbumDetailsQuery.isLoading && <DetailsPageBannerSkeleton />}

      <Box className="px-8 py-2">
        {AlbumDetailsQuery.isLoading &&
          Array(20)
            .fill(0)
            .map((_, i) => {
              return <SkeletonVerticalSongCard key={i} />;
            })}
        {AlbumDetailsQuery.isSuccess &&
          AlbumDetailsQuery.data &&
          AlbumDetailsQuery.data?.tracks.items.map((item, i) => {
            const songDetails = {
              title: item.name,
              image: "",
              id: item.id,
              artists: item.artists.map((artist) => artist.name),
              release_year: AlbumDetailsQuery?.data?.release_date,
              album: AlbumDetailsQuery.data.name,
              url: item.preview_url,
            };

            return <VerticalSongCard key={i} songDetails={songDetails} listRank={i} />;
          })}
      </Box>
    </Box>
  );
};
