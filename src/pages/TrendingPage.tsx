import VerticalSongCard from "../components/SongCard/VerticalSongCard"
import { Box, Button, Skeleton, Typography } from "@mui/material"
import { keyframes } from '@mui/system';
import { PlaylsitDataDTO } from "../dto/playlistDataDTO";
import { GetSpotifyDataAsJSON } from "../services/getApiData";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useAppStore } from "../store/store";
import SkeletonVerticalSongCard from "../components/SongCard/SkeletonVerticalSong";

const TreadingPage = () => {
    const [playlistDetails, setPlaylistDetails] = useState<PlaylsitDataDTO | null>(null)
    const { playlistid } = useParams();
    const { setPlaylistSongs, setOpenPlaylist, setCurrentTrack } = useAppStore()
    const [loadingState, setLoadingState] = useState<"loading" | "fulfilled" | "default">("default")


    const getTrendingData = async (playlistID: string) => {
        setLoadingState("loading")
        const trendingResponse = await GetSpotifyDataAsJSON<PlaylsitDataDTO>(`/playlists/${playlistID}`, {
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
        <>
            <Box className="flex items-center w-full">
                <Box sx={{
                    padding: "1rem 2rem",
                    marginTop: "1rem",
                    flexGrow: 2,
                    width: "13rem"
                }} >
                    {loadingState === "loading" && < Skeleton width={300} height={50}/>}
                    {loadingState === "loading" && < Skeleton width={300} />}
                    {loadingState === "fulfilled" && <>
                        <Typography variant='h4' className='p-2' sx={{
                            fontWeight: "bold",
                            ...animationHeading,
                        }}>{playlistDetails?.name}</Typography>
                        <Typography variant='body1' className='p-2' sx={{
                            color: "gray",
                            fontWeight: 500,
                            ...animationHeading,
                        }}>{playlistDetails?.description}</Typography>
                    </>}
                </Box>
                <Box className="grow">
                    {loadingState === "loading" && < Skeleton width={70} height={60} />}
                    {loadingState === "fulfilled" && <Button type="button" variant="outlined" onClick={() => {
                        setPlaylistSongs(playlistDetails)
                        setCurrentTrack(0)
                    }}>
                        Play
                    </Button>}
                </Box>
            </Box>
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
        </>
    )

}

export default TreadingPage