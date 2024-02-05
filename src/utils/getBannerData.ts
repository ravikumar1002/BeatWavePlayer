import { IAlbumDetailsDTO } from "@dto/albumDetailsDTO";
import { getReleaseYearValue } from "@hooks/getReleaseYearValue";

export const getBannerData = (playlistDetails: any) => {
    return {
        imageUrl: playlistDetails?.images[0].url ? playlistDetails?.images[0].url : "",
        name: playlistDetails?.name ? playlistDetails?.name : "",
        subText1: playlistDetails?.description ? playlistDetails?.description : "",
        subText2: playlistDetails?.tracks.items.length ? `${playlistDetails?.tracks.items.length} songs` : "",
        ...(playlistDetails?.followers?.total ? { subText3: `${playlistDetails?.followers?.total} followers` } : {})
    };
};

// type MediaType = 'ALBUMS' | 'TRACKS' | 'PLAYLISTS'

// const bannerCategoryType: Record<MediaType, string> = {
//     ALBUMS: '',
//     PLAYLISTS: '',
//     TRACKS: ''
// }

// const getbDate = (data, filterCategory: MediaType:MediaType) => {
//     const imageUrl = 'adfda',
//     const subText1 = get(data, obj[filterCategory], '')
// return {
//     imageUrl
// }
// }

export const getBannerFilterdDataFromAlbums = (bannerDataRawDetails: IAlbumDetailsDTO) => {

    return ({
        imageUrl: bannerDataRawDetails?.images[0].url ? bannerDataRawDetails?.images[0].url : "",
        name: bannerDataRawDetails?.name ? bannerDataRawDetails?.name : "",
        subText1: bannerDataRawDetails?.artists.map((artist) => artist.name) ? bannerDataRawDetails?.artists.map((artist) => artist.name) : "",
        subText2: bannerDataRawDetails?.total_tracks ? `${bannerDataRawDetails?.total_tracks} songs` : "",
        subText3: `${getReleaseYearValue(bannerDataRawDetails?.release_date)}`
    })

};