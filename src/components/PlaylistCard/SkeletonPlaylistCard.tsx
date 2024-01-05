import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box, CardActionArea, Skeleton } from '@mui/material';
import "./playlist-card.css"

export const SkeletonPlaylistCard = () => {

    return (
        <Card sx={{ maxWidth: 145 }}>
            <CardActionArea>
                <Box sx={{
                    overflow: 'hidden',
                }}>
                    <Skeleton variant="rectangular" height={140} />
                </Box>

                <CardContent>
                    <Skeleton height={30} />
                    <Box className="mydiv">
                        <Skeleton height={20} />
                        <Skeleton height={20} />
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}