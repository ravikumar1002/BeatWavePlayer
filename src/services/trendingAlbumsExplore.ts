import { SearchResultAlbumItems, SearchResultAlbums } from "@dto/searchResultDTO";
import { GetSpotifyDataAsJSON } from "./getApiData";

export const getAlbumsData = async (limit: number = 24) => {
    const trendingResponse = await GetSpotifyDataAsJSON<{ albums: SearchResultAlbums }>(
        `browse/new-releases?limit=${limit}`
    );
    return trendingResponse;
};

export const getAlbumsCategory = (categories: SearchResultAlbumItems[]) => {
    const filterData = categories.map((item) => ({
        _id: item.id,
        image: item.images[0].url,
        name: item.name,
        description: `${item.total_tracks} songs inculded`,
    }));
    return filterData;
};
