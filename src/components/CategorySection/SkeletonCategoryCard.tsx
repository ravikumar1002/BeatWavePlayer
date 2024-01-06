import { Box, Skeleton } from "@mui/material"
import { SkeletonPlaylistCard } from "../PlaylistCard/SkeletonPlaylistCard"

export const SkeletonCategorySection = () => {


    return (
        <Box className="p-6">
            <Box className="mb-5">
                <Skeleton height={50}  width={350}/>
            </Box>
            <Box className="flex flex-wrap gap-4">
                {Array(40).fill(0).map(() => {
                    return (
                        <SkeletonPlaylistCard />
                    )
                })}
            </Box>
        </Box>
    )
}