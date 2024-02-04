import { AlbumTracksItem } from "@dto/albumDetailsDTO";

export const getAlbumTracksItemsArray = (items: AlbumTracksItem[]) => {

    const tracksItems = items.map((item) => {
        return ({
            title: item.name,
            url: item?.preview_url ? item?.preview_url : "",
            image: "",
            id: item.id,
            artists: item.artists.map((artist) => artist.name),
            release_year: "",
            album: "",
        });
    });
    return tracksItems
};