import { Box, Typography } from "@mui/material"
import PlaylistCard from "../PlaylistCard/PlaylistCard"
import { useNavigate } from "react-router"
import { CategoryDTO } from "../../dto/categoryDTO"

interface ICategorySection {
    title: string
    data: CategoryDTO | undefined
}

export const CategorySection = (props: ICategorySection) => {
    const { title, data } = props
    const navigate = useNavigate();

    return (
        <Box className="p-6">
            <Box className="mb-5">
                <Typography variant="h4" component="div">{title}</Typography>
            </Box>
            <Box className="flex flex-wrap gap-4">
                {data && data?.playlists.items.map((item) => {
                    return (
                        <div key={item.id} onClick={() => {
                            navigate(`/playlist/${item.id}`)
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
        </Box>
    )
}