import { IAlbumDetailsDTO } from "@dto/albumDetailsDTO";
import { GetSpotifyDataAsJSON } from "@services/getApiData";
import { useAppStore } from "@store/store";
import { useQuery } from "@tanstack/react-query";
import { getAlbumTracksItemsArray } from "@utils/getAlbumsTracksData";
import { getBannerFilterdDataFromAlbums } from "@utils/getBannerData";
import { useParams } from "react-router-dom";

const useALbumDetailsPage = () => {
	const { albumId } = useParams();
	const { setPlaylistSongs, setOpenPlaylist, setCurrentTrack } = useAppStore()

	const getAlbumDetails = async (albumId: string | undefined) => {
		const trendingResponse = await GetSpotifyDataAsJSON<IAlbumDetailsDTO>(`/albums/${albumId}`, {
			params: {},
		});
		return trendingResponse;
	};

	const albumDetailsQuery = useQuery({
		queryKey: ["album_details", albumId],
		queryFn: async () => {
			const albumData = await getAlbumDetails(albumId);
			const albumArrangeData = {
				bannerData: getBannerFilterdDataFromAlbums(albumData),
				tracksData: getAlbumTracksItemsArray(albumData?.tracks.items),
			};
			setOpenPlaylist(albumArrangeData.tracksData);
			return albumArrangeData;
		},
	});

	const onBannerClick = () => {
		//@ts-expect-error "mujhe nhi pta"
		setPlaylistSongs(albumDetailsQuery.data.tracksData);
		setCurrentTrack(0);
	}

	return {
		albumDetailsQuery,
		onBannerClick
	}
}

export default useALbumDetailsPage
