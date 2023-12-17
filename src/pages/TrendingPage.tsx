import VerticalSongCard from "../components/SongCard/VerticalSongCard"
import { Box, Typography } from "@mui/material"
import { keyframes } from '@mui/system';
import { PlaylsitDataDTO } from "../dto/playlistDataDTO";


interface ITreadingPage {
    data: PlaylsitDataDTO ;
}

const TreadingPage = (props: ITreadingPage) => {
    const { data } = props

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