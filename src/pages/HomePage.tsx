import { useEffect, useState } from "react";
import { GetSpotifyDataAsJSON } from "../services/getApiData";
import { CategoryDTO } from "../dto/categoryDTO";
import { CategorySection } from "@components/CategorySection/CategorySection";
import { SkeletonCategoryCard } from "@components/CategorySection/SkeletonCategoryCard";

const loadingStateKey = {
    loading: "loading",
    fulfilled: "fulfilled",
    default: "default",
}

const HomePage = () => {
    const [data, setData] = useState<CategoryDTO>()
    const [loadingState, setLoadingState] = useState<"loading" | "fulfilled" | "default">("default")

    const getTrendingData = async () => {
        setLoadingState("loading")
        const trendingResponse = await GetSpotifyDataAsJSON<CategoryDTO>("browse/featured-playlists?limit=24", {
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
            {loadingState === "loading" && <SkeletonCategoryCard />}
            {loadingState === "fulfilled" && <CategorySection title="Browse popular playlists" data={data} />}
        </div>
    )
}

export default HomePage