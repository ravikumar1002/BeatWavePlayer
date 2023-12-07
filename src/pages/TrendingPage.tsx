import { GetSpotifyDataAsJSON } from "../services/getApiData";
import VerticalSongCard from "../components/SongCard/VerticalSongCard"
import { Box, Typography } from "@mui/material"
import { useState, useEffect } from 'react'
import { keyframes } from '@mui/system';



const TreadingPage = () => {

    const [data, setData] = useState({})

    const getTrendingData = async () => {

        const trendingResponse = await GetSpotifyDataAsJSON<any>("/playlists/37i9dQZEVXbLZ52XmnySJg", {
            params: {},
        });
        setData(trendingResponse)
        return trendingResponse
    }

    useEffect(() => {
        getTrendingData()
    }, [])

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

    console.log(data, "data");
    return (
        <>
            <Box>
                <Box sx={{
                    padding: "1rem 2rem",
                    marginTop: "1rem"
                }} >
                    <Typography variant='h4' className='p-2' sx={{
                        fontWeight: "bold",
                        ...animationHeading,
                    }}>{data?.name}</Typography>
                    <Typography variant='body1' className='p-2' sx={{
                        color: "gray",
                        fontWeight: 500,
                        ...animationHeading,
                    }}>{data?.description}</Typography>
                </Box>
            </Box>
            <Box sx={{
                padding: "0.5rem 2rem",
            }}>
                {data && data?.tracks?.items.map((item, i) => {
                    return (<VerticalSongCard key={i} songDetails={item} listRank={i} />)
                })}
            </Box>
        </>
    )

}

export default TreadingPage