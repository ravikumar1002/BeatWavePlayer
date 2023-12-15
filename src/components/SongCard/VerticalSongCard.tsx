import { useAppStore } from "../../store/store";
import { TrackItem } from "../../dto/playlistDataDTO";
import { Box, Typography } from "@mui/material"
import { keyframes } from '@mui/system';

interface IVerticalSongCardProps {
    songDetails: TrackItem,
    listRank: number,
}

const VerticalSongCard = (props: IVerticalSongCardProps) => {
    const { songDetails, listRank } = props
    const { setCurrentTrack } = useAppStore()

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
        <Box sx={{
            "&:hover": {
                color: 'red',
                cursor: "pointer",
            }
        }}>
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
                    <Box>
                        <img src={songDetails.track.album.images[0].url} alt="" style={{
                            height: "96px",
                            width: "96px",
                            objectFit: "cover",
                        }} />
                    </Box>
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>{listRank + 1}</Typography>
                    </Box>
                </Box>
                <Box className="" sx={{
                    flexGrow: 2
                }}>
                    <Box>
                        <Typography variant="h5" className='p-1' sx={{ fontWeight: 900 }}>
                            {songDetails.track.name}
                        </Typography>
                        <Box className="flex">
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