import { useEffect, useState } from "react";
import { GetSpotifyDataAsJSON } from "../services/getApiData";
import { CategorySection } from "../components/CategorySection/CategorySection";
import { SkeletonCategorySection } from "../components/CategorySection/skeletonCategoryCard";
import { CategoryDTO } from "../dto/categoryDTO";

const HomePage = () => {
    const [data, setData] = useState<CategoryDTO>()
    const [loadingState, setLoadingState] = useState<"loading" | "fulfilled" | "default">("default")

    const getTrendingData = async () => {
        setLoadingState("loading")
        const trendingResponse = await GetSpotifyDataAsJSON<CategoryDTO>("browse/featured-playlists?limit=24", {
            params: {},
        });
        console.log(trendingResponse, 'ds')
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