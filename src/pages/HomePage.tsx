import { useEffect, useState } from "react";
import { PlaylsitDataDTO } from "../dto/playlistDataDTO";
import { GetSpotifyDataAsJSON } from "../services/getApiData";
import { CategorySection } from "../components/CategorySection/CategorySection";
import { SkeletonCategorySection } from "../components/CategorySection/skeletonCategoryCard";

const HomePage = () => {
    const [data, setData] = useState<PlaylsitDataDTO>()
    const [loadingState, setLoadingState] = useState<"loading" | "fulfilled" | "default">("default")

    const getTrendingData = async () => {
        setLoadingState("loading")
        const trendingResponse = await GetSpotifyDataAsJSON<PlaylsitDataDTO>("browse/featured-playlists?limit=50", {
            params: {},
        });
        setData(trendingResponse)
        setLoadingState("fulfilled")
        return trendingResponse
    }

    useEffect(() => {
        getTrendingData()
    }, [])


    return (
        <div>
            {loadingState === "loading" && <SkeletonCategorySection />}
            {loadingState === "fulfilled" && <CategorySection title="Browse your favorite" data={data} />}
        </div>
    )
}

export default HomePage