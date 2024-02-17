import { IAlbumDetailsDTO } from "@dto/albumDetailsDTO";
import { ArtistDetailsDTO } from "@dto/artistDetailsDTO";
import { PlaylistDataDTO } from "@dto/playlistDataDTO";
import { getReleaseYearValue } from "@hooks/getReleaseYearValue";

const convertToK = (followerCount: number) => {
  if (followerCount < 1000) {
    return followerCount;
  } else if (followerCount < 1000000) {
    return (followerCount / 1000).toFixed(1) + "k";
  } else {
    return (followerCount / 1000000).toFixed(1) + "M";
  }
  // if followers_count < 1000:
  //     return str(followers_count)
  // elif followers_count < :
  //
  // else:
  //     return str(round(followers_count / , 1)) + 'M'
};

export const getBannerData = (playlistDetails: PlaylistDataDTO) => {
  const data = {
    imageUrl: playlistDetails?.images[0].url ? playlistDetails?.images[0].url : "",
    name: playlistDetails?.name ? playlistDetails?.name : "",
    subText1: playlistDetails?.description ? playlistDetails?.description : "",
    subText2: playlistDetails?.tracks.items.length
      ? `${playlistDetails?.tracks.items.length} songs`
      : "",
    ...(playlistDetails?.followers?.total
      ? { subText3: `${convertToK(playlistDetails?.followers?.total)} followers` }
      : {}),
  };
  console.log(data, "ban");
  return data;
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
  return {
    imageUrl: bannerDataRawDetails?.images[0].url ? bannerDataRawDetails?.images[0].url : "",
    name: bannerDataRawDetails?.name ? bannerDataRawDetails?.name : "",
    subText1: bannerDataRawDetails?.artists.map((artist) => artist.name)
      ? bannerDataRawDetails?.artists.map((artist) => artist.name)
      : "",
    subText2: bannerDataRawDetails?.total_tracks
      ? `${bannerDataRawDetails?.total_tracks} songs`
      : "",
    subText3: `${getReleaseYearValue(bannerDataRawDetails?.release_date)}`,
  };
};

export const getBannerArtistdDataFromArtist = (bannerDataRawDetails: ArtistDetailsDTO) => {
  return {
    imageUrl: bannerDataRawDetails?.images[0].url ? bannerDataRawDetails?.images[0].url : "",
    name: bannerDataRawDetails?.name ? bannerDataRawDetails?.name : "",
    subText1: bannerDataRawDetails?.genres
      ? bannerDataRawDetails?.genres.map((genre, i) =>
          bannerDataRawDetails?.genres.length - 1 === i
            ? genre.slice(0, 1).toUpperCase() + genre.slice(1)
            : genre.slice(0, 1).toUpperCase() + genre.slice(1) + ", ",
        )
      : [],
    subText2: bannerDataRawDetails?.followers
      ? `${convertToK(bannerDataRawDetails?.followers.total)} followers`
      : "",
  };
};
