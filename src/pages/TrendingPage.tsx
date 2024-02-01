import { Box } from "@mui/material";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { PlaylistDataDTO } from "@dto/playlistDataDTO";
import { useAppStore } from "@store/store";
import { GetSpotifyDataAsJSON } from "@services/getApiData";
import { SkeletonVerticalSongCard, VerticalSongCard } from "@components/SongCard";
import { DetailsPageBanner } from "@components/DetailsPageBanner/DetailsPageBanner";
import { DetailsPageBannerSkeleton } from "@components/DetailsPageBanner/DetailsPageBannerSkeleton";
// import ColorThief from 'colorthief'

export const TrendingPage = () => {
  const [playlistDetails, setPlaylistDetails] = useState<PlaylistDataDTO | null>(null);
  const { playlistid } = useParams();
  const { setPlaylistSongs, setOpenPlaylist, setCurrentTrack } = useAppStore();
  const [loadingState, setLoadingState] = useState<"loading" | "fulfilled" | "default">("default");
  // const colorThief = new ColorThief();

  // const imageRef = useRef(null)

  // const getColor = () => {

  // }

  // if (imageRef?.current) {
  //     colorThief.getColor(img);
  // } else {
  //     image.addEventListener('load', function () {
  //         colorThief.getColor(img);
  //     });
  // }
  // useEffect(() => {
  //     console.log(imageRef?.current)
  // }, [imageRef])

  const getTrendingData = async (playlistID: string) => {
    setLoadingState("loading");
    const trendingResponse = await GetSpotifyDataAsJSON<PlaylistDataDTO>(
      `/playlists/${playlistID}`,
      {
        params: {},
      }
    );
    setPlaylistDetails(trendingResponse);
    setOpenPlaylist(trendingResponse);
    setLoadingState("fulfilled");
    return trendingResponse;
  };

  useEffect(() => {
    getTrendingData(`${playlistid}`);
  }, [playlistid]);

  return (
    <Box
      sx={{
        background: "azure",
      }}
    >
      {loadingState === "fulfilled" && (
        <DetailsPageBanner
          bannerDetails={{
            imageUrl: playlistDetails?.images[0].url,
            name: playlistDetails?.name,
            description: playlistDetails?.description,
            itemsLength: playlistDetails?.tracks.items.length,
            followers: playlistDetails?.followers.total,
          }}
          onClick={() => {
            const tracksItems = playlistDetails?.tracks?.items.map((item) => {
              return {
                title: item.track.name,
                url: item.track?.preview_url ? item.track?.preview_url : "",
                image: item.track.album.images[0].url,
                id: item.track.id,
                artists: item.track.artists,
                release_year: item.track.album.release_date,
                album: item.track.album.name,
              };
            });
            setPlaylistSongs(tracksItems ? tracksItems : null);
            setCurrentTrack(0);
          }}
        />
      )}
      {loadingState === "loading" && <DetailsPageBannerSkeleton />}
      <Box
        sx={{
          padding: "0.5rem 2rem",
        }}
      >
        {loadingState === "loading" &&
          Array(20)
            .fill(0)
            .map((_, i) => {
              return <SkeletonVerticalSongCard key={i} />;
            })}
        {loadingState === "fulfilled" &&
          playlistDetails &&
          playlistDetails?.tracks?.items.map((item, i) => {
            return <VerticalSongCard key={i} songDetails={item} listRank={i} />;
          })}
      </Box>
    </Box>
  );
};

export default TrendingPage;
