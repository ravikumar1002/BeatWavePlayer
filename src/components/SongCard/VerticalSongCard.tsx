import { useAppStore } from "../../store/store";
import { TrackItem } from "../../dto/playlistDataDTO";
import { Box, Typography, SxProps } from "@mui/material"
import { keyframes } from '@mui/system';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import PlayArrowSharpIcon from '@mui/icons-material/PlayArrowSharp';
// import "./vertical-song.css"
interface IVerticalSongCardProps {
    songDetails: TrackItem,
    listRank: number,
}

const styles: Record<string, SxProps> = {
    imageIconHover: {
        position: "absolute",
        background: "#aca4a45e",
        top: 0,
        right: 0,
        width: "100%",
        height: "100%",
        translate: "50% 50%,",
        color: "brown",
        padding: "1rem",
    },
    verticalSongContainer: {
        "&:hover": {
            color: 'red',
            cursor: "pointer",
            "& .play": {
                visibility: 'visible',
                zIndex: "10",
                background: "#aca4a45e",
            }
        }
    },

}

const VerticalSongCard = (props: IVerticalSongCardProps) => {
    const { songDetails, listRank } = props
    const { playingsongId, setCurrentTrack } = useAppStore()

    const dDzoI = keyframes`
        0% {
            opacity: 0;
        }   
        100% {
            opacity: 1;
        }`;

    const cardAnimation = {
        animationDuration: "0.7s",
        animationDelay: "0.25s",
        animationFillMode: "both",
        animationName: `${dDzoI}`,
    }
    return (
        <Box sx={styles.verticalSongContainer}>
            <Box className="w-full flex p-6 bg-white" sx={{
                ...cardAnimation,
                marginTop: "0.5rem"
            }}
                onClick={() => {
                    setCurrentTrack(listRank)
                }}
            >
                <Box className="flex gap-10 w-1/6" sx={{
                    alignItems: "center",
                    borderRadius: "5px"
                }}>
                    <Box className="relative">
                        <img src={songDetails.track.album.images[0].url} alt={songDetails.track.name} style={{
                            height: "96px",
                            width: "96px",
                            objectFit: "cover",
                            borderRadius: "5px",
                        }} />
                        {
                            playingsongId === songDetails.track.id && <GraphicEqIcon fontSize="small" sx={styles.imageIconHover} />
                        }
                        {
                            playingsongId !== songDetails.track.id && <PlayArrowSharpIcon fontSize="small" sx={{
                                ...styles.imageIconHover,
                                visibility: "hidden",
                            }} className="play" />
                        }
                    </Box>
                    <Box>
                        <Typography variant="h5" sx={{
                            fontWeight: 700,
                            color: `${playingsongId === songDetails.track.id && "blue"}`,
                        }}>{listRank + 1}</Typography>
                    </Box>
                </Box>
                <Box className="" sx={{
                    flexGrow: 2
                }}>
                    <Box>
                        <Typography variant="h5" className='p-1' sx={{
                            fontWeight: 900,
                            color: `${playingsongId === songDetails.track.id && "blue"}`,
                            '&:hover': {
                                color: "inherit"
                            }
                        }}>
                            {songDetails.track.name}
                        </Typography>
                        <Box className="flex flex-wrap">
                            {songDetails.track.artists.map((details, i) => {
                                return (
                                    <Typography key={i} variant='body1' className='p-1' sx={{
                                        color: "gray",
                                        fontWeight: 500,
                                    }}>
                                        {details.name}{i !== songDetails.track.artists.length - 1 ? ", " : ""}
                                    </Typography>
                                )
                            })}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default VerticalSongCard