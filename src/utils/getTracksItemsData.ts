import { PlaylistTrackItems, TrackItem } from "@dto/playlistDataDTO";
import { getReleaseYearValue } from "@hooks/getReleaseYearValue";

export const getPlaylistsTrackItemsData = (item: PlaylistTrackItems) => {
  const title = item.name;
  const url = item.preview_url ? item.preview_url : "";
  const image = item.album?.images[0]?.url || "";
  const id = item.id;
  const artists = item.artists.map((artist) => artist.name);
  const release_year = getReleaseYearValue(item.album.release_date);
  const album = item.album.name;

  return {
    title,
    url,
    image,
    id,
    artists,
    release_year,
    album,
  };
};

export const getPlaylistsTracksItemsArray = (items: TrackItem[]) => {
  const tracksItems = items.map((data) => {
    const item = data.track;
    return {
      title: item.name,
      url: item?.preview_url ? item?.preview_url : "",
      image: item.album?.images[0]?.url || "",
      id: item.id,
      artists: item.artists.map((artist) => artist.name),
      release_year: getReleaseYearValue(item.album.release_date),
      album: item.album.name,
    };
  });
  return tracksItems;
};
