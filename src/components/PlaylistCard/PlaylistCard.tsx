import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, SxProps } from '@mui/material';
import "./playlist-card.css"
interface IDetailsProps {
    image: string
    name: string
    description: string
}

interface IPlaylistCardProps {
    details: IDetailsProps
}

const styles: Record<string, SxProps> = {
    wrapper: {
        maxWidth: 145,
        "&:hover": {
            "& .image-container": {
                transform: "scale(1.1)",
                transition: "transform .4s",
            }
        }
    }


}


export default function PlaylistCard(props: IPlaylistCardProps) {
    const { image, name, description } = props.details
    return (
        <Card sx={styles.wrapper}>
            <CardActionArea>
                <Box sx={{
                    overflow: 'hidden',
                }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={image}
                        alt={name}
                        className='image-container'
                    />
                </Box>

                <CardContent>
                    <Typography gutterBottom variant="subtitle2" component="div" fontWeight={"800"} sx={{
                        lineBreak: "anywhere",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}>
                        {name}
                    </Typography>
                    <Box className="mydiv">
                        <Typography variant="caption" color="text.secondary" className='mytext'>
                            {description}
                        </Typography>
                        <Box color="text.secondary" className='myelli'>...</Box>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}