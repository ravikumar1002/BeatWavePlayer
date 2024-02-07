import { GetSpotifyDataAsJSON } from "./getApiData";


export const getPlaylistsData = async (limit: number) => {
    const trendingResponse = await GetSpotifyDataAsJSON(
        `browse/featured-playlists?limit=${limit}`
    );
    return trendingResponse;
};