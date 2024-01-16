import { Box, Button, Skeleton, Typography } from "@mui/material"
import { keyframes } from '@mui/system';
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { PlaylistDataDTO } from "@dto/playlistDataDTO";
import { useAppStore } from "@store/store";
import { GetSpotifyDataAsJSON } from "@services/getApiData";
import { SkeletonVerticalSongCard, VerticalSongCard } from "@components/SongCard";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export const TrendingPage = () => {
    const [playlistDetails, setPlaylistDetails] = useState<PlaylistDataDTO | null>(null)
    const { playlistid } = useParams();
    const { setPlaylistSongs, setOpenPlaylist, setCurrentTrack } = useAppStore()
    const [loadingState, setLoadingState] = useState<"loading" | "fulfilled" | "default">("default")


    const getTrendingData = async (playlistID: string) => {
        setLoadingState("loading")
        const trendingResponse = await GetSpotifyDataAsJSON<PlaylistDataDTO>(`/playlists/${playlistID}`, {
            params: {},
        });
        setPlaylistDetails(trendingResponse)
        setOpenPlaylist(trendingResponse)
        setLoadingState("fulfilled")
        return trendingResponse
    }

    useEffect(() => {
        getTrendingData(`${playlistid}`)
    }, [playlistid])

    const dmNUZD = keyframes`
    100% {
      transform: translate(0px);
  }`;


    const animationHeading = {
        animationDuration: "0.3s",
        animationFillMode: "forwards",
        display: "block",
        animationName: `${dmNUZD}`,
        transform: "translateY(100%)",
        animationPlayState: "running"
    }

    return (
        <Box sx={{
            background: "azure",
        }}>
            {loadingState === "fulfilled" &&
                <Box className="flex items-center w-full" >
                    <Box sx={{
                        width: "20rem",
                        padding: "1rem 2rem",
                    }}>
                        <img src={playlistDetails?.images[0].url} alt="" className="rounded" />
                    </Box>
                    <Box sx={{
                        marginTop: "1rem",
                        flexGrow: 2,
                        width: "13rem"
                    }} >
                        <Box>
                            <Typography variant='h4' className='p-2' sx={{
                                fontWeight: "bold",
                                ...animationHeading,
                            }}>{playlistDetails?.name}</Typography>
                            <Typography variant='body1' className='p-2' sx={{
                                color: "gray",
                                fontWeight: 500,
                                ...animationHeading,
                            }}>{playlistDetails?.description}</Typography>
                        </Box>
                        <Box className="flex gap-5 flex-wrap">
                            <Typography variant='body2' className='p-2' sx={{
                                color: "gray",
                                fontWeight: 500,
                                ...animationHeading,
                            }}>{playlistDetails?.tracks.items.length} Songs</Typography>
                            <Typography variant='body2' className='p-2' sx={{
                                color: "gray",
                                fontWeight: 500,
                                ...animationHeading,
                            }}>{playlistDetails?.followers.total} followers</Typography>
                        </Box>
                        <Box className="ml-12 mt-4">
                            {<Button type="button" variant="contained" startIcon={<PlayArrowIcon />} onClick={() => {
                                setPlaylistSongs(playlistDetails)
                                setCurrentTrack(0)
                            }}
                                sx={{
                                    background: "purple",
                                }}>
                                Play All
                            </Button>}
                        </Box>
                    </Box>
                </Box>
            }
            {loadingState === "loading" &&
                <Box className="flex items-center w-full" >
                    <Box sx={{
                        width: "20rem",
                        height: "25rem",
                        padding: "1rem 2rem",
                    }}>
                        <Skeleton sx={{
                            width: "100%",
                            height: "100%",
                        }} />
                    </Box>
                    <Box sx={{
                        marginTop: "1rem",
                        flexGrow: 2,
                        width: "13rem"
                    }} >
                        <Box>
                            <Skeleton sx={{
                                width: "25rem",
                                height: "4rem",
                            }} />
                            <Skeleton sx={{
                                width: "40rem",
                            }} />
                        </Box>
                        <Box className="flex gap-5 flex-wrap">
                            <Skeleton sx={{
                                width: "5rem",
                            }} />
                            <Skeleton sx={{
                                width: "5rem",
                                padding: "1rem 2rem",
                            }} />
                        </Box>
                        <Box className="ml-12 mt-4">
                            <Skeleton width={90} height={60} />
                        </Box>
                    </Box>
                </Box>
            }
            <Box sx={{
                padding: "0.5rem 2rem",
            }}>
                {loadingState === "loading" && Array(20).fill(0).map(() => {
                    return (
                        <SkeletonVerticalSongCard />
                    )
                })}
                {loadingState === "fulfilled" && playlistDetails && playlistDetails?.tracks?.items.map((item, i) => {
                    return (<VerticalSongCard key={i} songDetails={item} listRank={i} />)
                })}
            </Box>

        </Box>
    )

}

export default TrendingPage