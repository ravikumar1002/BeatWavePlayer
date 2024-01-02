import { useEffect, useState } from "react";
import { PlaylsitDataDTO } from "../dto/playlistDataDTO";
import { GetSpotifyDataAsJSON } from "../services/getApiData";
import { Box } from "@mui/material";
import { useNavigate } from "react-router";
import PlaylistCard from "../components/PlaylistCard/PlaylistCard";
import { useAppStore } from "../store/store";

const HomePage = () => {
    const navigate = useNavigate();
    const [data, setData] = useState()
    const { setPlaylistSongs } = useAppStore()

    const getTrendingData = async () => {

        const trendingResponse = await GetSpotifyDataAsJSON<PlaylsitDataDTO>("browse/featured-playlists?limit=24", {
            params: {},
        });
        setData(trendingResponse)
        return trendingResponse
    }
    useEffect(() => {
        getTrendingData()
    }, [])


    return (
        <div>
            <Box className="flex flex-wrap gap-4">
                {data && data?.playlists.items.map((item) => {
                    return (
                        <div onClick={() => {
                            navigate(`/playlist/${item.id}`)
                            console.log(item)
                        }}>
                            <PlaylistCard details={{
                                image: item.images[0].url,
                                name: item.name,
                                description: item.description,
                            }} />
                        </div>
                    )
                })}
            </Box>
        </div>
    )
}

export default HomePage