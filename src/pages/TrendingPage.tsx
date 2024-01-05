import VerticalSongCard from "../components/SongCard/VerticalSongCard"
import { Box, Button, Typography } from "@mui/material"
import { keyframes } from '@mui/system';
import { PlaylsitDataDTO } from "../dto/playlistDataDTO";
import { GetSpotifyDataAsJSON } from "../services/getApiData";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useAppStore } from "../store/store";

const TreadingPage = () => {
    const [playlistDetails, setPlaylistDetails] = useState<PlaylsitDataDTO | null>(null)
    const { playlistid } = useParams();
    const { setPlaylistSongs, setOpenPlaylist,setCurrentTrack } = useAppStore()

    console.log(playlistid)

    const getTrendingData = async (playlistID: string) => {

        const trendingResponse = await GetSpotifyDataAsJSON<PlaylsitDataDTO>(`/playlists/${playlistID}`, {
            params: {},
        });
        setPlaylistDetails(trendingResponse)
        setOpenPlaylist(trendingResponse)
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
                }} >
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
                <Box className="grow">
                    <Button type="button" variant="outlined" onClick={() => {
                        setPlaylistSongs(playlistDetails)
                        setCurrentTrack(0)
                    }}>
                        Play
                    </Button>
                </Box>
            </Box>
            <Box sx={{
                padding: "0.5rem 2rem",
            }}>
                {playlistDetails && playlistDetails?.tracks?.items.map((item, i) => {
                    return (<VerticalSongCard key={i} songDetails={item} listRank={i} />)
                })}
            </Box>
        </>
    )

}

export default TreadingPage