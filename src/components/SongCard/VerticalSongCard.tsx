import { Box, Typography } from "@mui/material"
import { keyframes } from '@mui/system';

const dDzoI = keyframes`
0% {
    opacity: 0;
}
100% {
    opacity: 1;
}
`;

const VerticalSongCard = () => {

    return (
        <Box className="w-full flex p-8 bg-white" sx={{
            animationDuration: "0.7s",
            animationDelay: "0.25s",
            animationFillMode: "both",
            animationName: `${dDzoI}`,
            transform: "translateY(100%)",
            animationPlayState: "running",
            marginTop: "0.5rem"
        }}>
            <Box className="flex gap-10 w-1/6" sx={{
                alignItems: "center",
                borderRadius: "5px"
            }}>
                <Box>
                    <img src="https://i.scdn.co/image/ab67616d00001e0234f21d3047d85440dfa37f10" alt="" style={{
                        height: "96px",
                        width: "96px",
                        objectFit: "cover",
                    }} />
                </Box>
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>1</Typography>
                </Box>
            </Box>
            <Box className="" sx={{
                flexGrow: 2
            }}>
                <Box>
                    <Typography variant="h5" className='p-1' sx={{ fontWeight: 900 }}>
                        All I Want for Christmas Is You
                    </Typography>
                    <Typography variant='body1' className='p-1' sx={{
                        color: "gray",
                        fontWeight: 500,
                    }}>
                        Mariah Carey
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default VerticalSongCard