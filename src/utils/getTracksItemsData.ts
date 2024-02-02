
export const getTracksItemsData = (items: any) => {
  const tracksItems = items.map((item) => {
    return {
      title: item.track.name,
      url: item.track?.preview_url ? item.track?.preview_url : "",
      image: item.track.album.images[0].url,
      id: item.track.id,
      artists: item.track.artists,
      release_year: item.track.album.release_date,
      album: item.track.album.name,
    };
  });
  return tracksItems;
};