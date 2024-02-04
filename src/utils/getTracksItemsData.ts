import { PlaylistTrackItems, TrackItem } from "@dto/playlistDataDTO";
import { getReleaseYearValue } from "@hooks/getReleaseYearValue";

export const getTracksItemsData = (item: PlaylistTrackItems) => {
  const title = item.name
  const url = item.preview_url ? item.preview_url : ""
  const image = item.album.images[0].url
  const id = item.id
  const artists = item.artists.map((artist) => artist.name)
  const release_year = getReleaseYearValue(item.album.release_date)
  const album = item.album.name
  
  return ({
    title, url, image, id, artists, release_year, album
  });
};


export const getTracksItemsArray = (items: TrackItem[]) => {
  const tracksItems = items.map((item) => {
    const { track } = item
    return ({
      title: track.name,
      url: track?.preview_url ? track?.preview_url : "",
      image: track.album.images[0].url,
      id: track.id,
      artists: track.artists.map((artist) => artist.name),
      release_year: track.album.release_date,
      album: track.album.name,
    });
  });
  return tracksItems
};