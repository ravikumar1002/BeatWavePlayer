import { Box, Grid, Skeleton } from "@mui/material"
import { SkeletonPlaylistCard } from "../PlaylistCard/SkeletonPlaylistCard"

export const SkeletonCategoryCard = () => {

    return (
        <Box className="p-6">
            <Box className="mb-5">
                <Skeleton width={500} height={60} />
            </Box>
            <Grid container spacing={4} className="p-4">
                {Array(40).fill(0).map((_, i) => {
                    return (
                        <Grid item xs={6} sm={4} md={3} lg={2} xl={2} columnSpacing={2} key={i}>
                            <SkeletonPlaylistCard />
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    )
}