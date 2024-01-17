import { PlaylistCard } from "@components/PlaylistCard"
import { CategoryDTO } from "@dto/categoryDTO"
import { Box, Grid, Typography } from "@mui/material"
import { useNavigate } from "react-router"


interface ICategorySection {
    title: string
    data: CategoryDTO | undefined
}

export const CategorySection = (props: ICategorySection) => {
    const { title, data } = props
    const navigate = useNavigate();

    const playlistItems = data?.playlists?.items || []

    return (
        <Box className="p-6">
            <Box className="mb-5">
                <Typography variant="h4" component="div">{title}</Typography>
            </Box>
            <Grid container spacing={4} className="p-4">
                {playlistItems.map((item) => <Grid item xs={6} sm={4} md={3} lg={2} xl={2} columnSpacing={2}  key={item.id} onClick={() => {
                    navigate(`/playlist/${item.id}`)
                }}>
                    <PlaylistCard details={{
                        image: item.images[0].url,
                        name: item.name,
                        description: item.description,
                    }} />
                </Grid>)}

            </Grid>
            <Box className="flex flex-wrap gap-4">

            </Box>
        </Box>
    )
}