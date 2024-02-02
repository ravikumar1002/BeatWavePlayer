import { GetSpotifyDataAsJSON } from "@services/getApiData";
import { useAppStore } from "@store/store";
import { useQuery } from "@tanstack/react-query";
import { getTracksItemsData } from "@utils/getTracksItemsData";
import { useParams } from "react-router-dom";

const useALbumDetailsPage = () => {
	const { albumId } = useParams();
	const { setPlaylistSongs, setOpenPlaylist, setCurrentTrack } = useAppStore()

	const getAlbumDetails = async (albumId: string | undefined) => {
		const trendingResponse = await GetSpotifyDataAsJSON(`/albums/${albumId}`, {
			params: {},
		});
		return trendingResponse;
	};

	const albumDetailsQuery = useQuery({
		queryKey: ["albumDetails"],
		queryFn: async () => {
			const albumData = await getAlbumDetails(albumId);
			setOpenPlaylist(albumData);
			return albumData;
		},
	});

	const onBannerClick = () => {
		const tracksItems = getTracksItemsData(albumDetailsQuery.data?.tracks.items);
		setPlaylistSongs(tracksItems ? tracksItems : null);
		setCurrentTrack(0);
	}

	return {
		albumDetailsQuery,
		onBannerClick
	}
}

export default useALbumDetailsPage