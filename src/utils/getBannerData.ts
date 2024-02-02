export const getBannerData = (playlistDetails: any) => {
    return {
        imageUrl: playlistDetails?.images[0].url ? playlistDetails?.images[0].url : "",
        name: playlistDetails?.name ? playlistDetails?.name : "",
        subText1: playlistDetails?.description ? playlistDetails?.description : "",
        subText2: playlistDetails?.tracks.items.length ? `${playlistDetails?.tracks.items.length} songs` : "",
        ...(playlistDetails?.followers?.total ? { subText3: `${playlistDetails?.followers?.total} followers` } : {})
    };
};