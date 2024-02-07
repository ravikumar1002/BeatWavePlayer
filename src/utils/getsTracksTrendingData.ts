import { TrendingTrackHome } from "@dto/tracksHomeDTO";
import { getReleaseYearValue } from "@hooks/getReleaseYearValue";



export const getHomeTracksItemsArray = (items: TrendingTrackHome[]) => {

    const tracksItems = items.map((item) => {
        return ({
            title: item.name,
            url: item?.preview_url ? item?.preview_url : "",
            image: item.album.images[2].url,
            id: item.id,
            artists: item.artists.map((artist) => artist.name),
            release_year: getReleaseYearValue(item.album.release_date),
            album: item.album.name,
        });
    });
    return tracksItems
};