export const getBannerData = (playlistDetails: any) => {
    return {
        imageUrl: playlistDetails?.images[0].url ? playlistDetails?.images[0].url : "",
        name: playlistDetails?.name ? playlistDetails?.name : "",
        subText1: playlistDetails?.description ? playlistDetails?.description : "",
        subText2: playlistDetails?.tracks.items.length ? `${playlistDetails?.tracks.items.length} songs` : "",
        ...(playlistDetails?.followers?.total ? { subText3: `${playlistDetails?.followers?.total} followers` } : {})
    };
};

// type MediaType = 'ALBUM' | 'TRACK' | 'PLAYLIST'

// const obj: Record<MediaType, string> = {
//     ALBUM: '',
//     PLAYLIST: '',
//     TRACK: ''
// }

// const getbDate = (data, filterCategory: MediaType) => {
//     const imageUrl = 'adfda',
//     const subText1 = get(data, obj[filterCategory], '')
// return {
//     imageUrl
// }
// }