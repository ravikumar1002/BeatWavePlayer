import { ArtistDetailsDTO } from "@dto/artistDetailsDTO";
import { ITracksDetailsDTO } from "@dto/tracksDetailsDTO";
import { GetSpotifyDataAsJSON } from "@services/getApiData";
import { useAppStore } from "@store/store";
import { useQuery } from "@tanstack/react-query";
import { getBannerArtistdDataFromArtist } from "@utils/getBannerData";
import { getSongsFilteredData } from "@utils/getSongsFilteredData";
import { useParams } from "react-router-dom";

export const useArtistsDetailsPage = () => {
    const { artistId } = useParams();
    const { setPlaylistSongs, setOpenPlaylist, setCurrentTrack } = useAppStore()

    const getArtistBannerDetailsAPIResponse = async (artistId: string | undefined) => {
        const artistsResponse = await GetSpotifyDataAsJSON<ArtistDetailsDTO>(`/artists/${artistId}`);
        return artistsResponse;
    };

    const getArtistTracksDetailsAPIResponse = async (artistId: string | undefined) => {
        const artistsResponse = await GetSpotifyDataAsJSON<ITracksDetailsDTO>(`/artists/${artistId}/top-tracks?market=IN`);
        return artistsResponse;
    };

    const artistDetailsQuery = useQuery({
        queryKey: ["artist_details", artistId],
        queryFn: async () => {
            const artistDetails = await getArtistBannerDetailsAPIResponse(artistId);
            const artistTopTracks = await getArtistTracksDetailsAPIResponse(artistId);

            console.log(artistDetails, artistTopTracks)

            const albumArrangeData = {
                bannerData: getBannerArtistdDataFromArtist(artistDetails),
                tracksData: getSongsFilteredData(artistTopTracks.tracks),
            };
            console.log(albumArrangeData, "alm")
            setOpenPlaylist(albumArrangeData.tracksData);
            return albumArrangeData;
        },
        refetchOnWindowFocus: false,
    });

    console.log(artistDetailsQuery)

    const onBannerClick = () => {
        setPlaylistSongs(artistDetailsQuery.data?.tracksData);
        setCurrentTrack(0);
    }

    return {
        artistDetailsQuery,
        onBannerClick
    }
}

