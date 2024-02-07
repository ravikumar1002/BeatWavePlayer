import { CategoryDTO, CategoryItem } from "@dto/categoryDTO";
import { GetSpotifyDataAsJSON } from "./getApiData";

export const getPlaylistCategory = (categories: CategoryItem[]) => {
    const filterData = categories.map((item) => ({
        _id: item.id,
        image: item.images[0].url,
        name: item.name,
        description: item.description,
    }));
    return filterData;
};

export const getPlaylistsData = async (limit: number) => {
    const trendingResponse = await GetSpotifyDataAsJSON<CategoryDTO>(
        `browse/featured-playlists?limit=${limit}`
    );
    return trendingResponse;
};