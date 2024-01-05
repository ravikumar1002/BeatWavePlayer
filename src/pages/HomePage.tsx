import { useEffect, useState } from "react";
import { PlaylsitDataDTO } from "../dto/playlistDataDTO";
import { GetSpotifyDataAsJSON } from "../services/getApiData";
import { Box } from "@mui/material";
import { useNavigate } from "react-router";
import PlaylistCard from "../components/PlaylistCard/PlaylistCard";
import { useAppStore } from "../store/store";
import { CategorySection } from "../components/CategorySection/CategorySection";

const HomePage = () => {
    const navigate = useNavigate();
    const [data, setData] = useState()
    const { setPlaylistSongs } = useAppStore()

    const getTrendingData = async () => {

        const trendingResponse = await GetSpotifyDataAsJSON<PlaylsitDataDTO>("browse/featured-playlists?limit=50", {
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
            <CategorySection title="Browse your favorite" data={data} />
        </div>
    )
}

export default HomePage