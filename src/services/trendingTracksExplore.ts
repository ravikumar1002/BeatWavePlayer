// import { TracksHomeTrendingDTO } from "@dto/tracksHomeDTO";
import { GetSpotifyDataAsJSON } from "./getApiData";
import { PlaylistDataDTO } from "@dto/playlistDataDTO";


// export const getTredingTracksData = async (limit: number) => {
//     const trendingResponse = await GetSpotifyDataAsJSON(
//         `recommendations?limit=${limit}&market=IN&seed_genres=classical%romance%2dance%2edm%2indie&seed_tracks=0c6xIDDpzE81m2q797ordA&seed_artists=4NHQUGzhtTLFvgF5SZesLK`
//     );
//     return trendingResponse;
// };


// export const getTredingTracksData = async (limit: number) => {
//     const trendingResponse = await GetSpotifyDataAsJSON<TracksHomeTrendingDTO>(
//         `recommendations?limit=${limit}&market=IN&seed_genres=classical%2Ccountry%2dance%2edm`
//     );
//     return trendingResponse;
// };

export const getTredingTracksData = async (limit: number) => {
    const trendingResponse = await GetSpotifyDataAsJSON<PlaylistDataDTO>(
        `/playlists/2YRe7HRKNRvXdJBp9nXFza?limit=${limit}`
    );
    return trendingResponse;
};

// recommendations ? limit = 5 & market=IN & seed_artists=4NHQUGzhtTLFvgF5SZesLK & seed_genres=classical % 2Ccountry & seed_tracks=0c6xIDDpzE81m2q797ordA'