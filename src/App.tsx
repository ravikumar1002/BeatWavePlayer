import { Box, Typography } from '@mui/material';
import { keyframes } from '@mui/system';
import './App.css'
import Header from './components/Header/Header';
import VerticalSongCard from './components/SongCard/VerticalSongCard';
import appConfigs from './config/appConfigs';
import axios from 'axios';

// import { GetSpotifyDataAsJSON } from './services/getApiData';

// export const getTrendingData = () => {

//   const trendingResponse = GetSpotifyDataAsJSON<any>("/trending/all/day", {
//     params: {
//     },
//   });

//   return trendingResponse
// }

function App() {

  const { ClientSecret: Client_secret, clientID: client_id } = appConfigs.spotify;


  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    method: 'post',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(client_id + ':' + Client_secret).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: 'grant_type=client_credentials',
  };

  axios(authOptions)
    .then(response => {
      const token = response.data.access_token;
      console.log('Access Token:', token);
    })
    .catch(error => {
      console.error('Error getting access token:', error.response ? error.response.data : error.message);
    });


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
      <div>
        <Header />
        <Box>
          <Box sx={{
            padding: "2rem"
          }} >
            <Typography variant='h4' className='p-4' sx={{
              fontWeight: "bold",
              ...animationHeading,
            }}>Weekly Top Songs Global</Typography>
            <Typography variant='body1' className='p-4' sx={{
              color: "gray",
              fontWeight: 500,
              ...animationHeading,
            }}>Friday, November 24 - Thursday, November 30, 2023</Typography>
          </Box>
        </Box>
        <Box sx={{
          padding: "2rem",
        }}>
          <VerticalSongCard />
          <VerticalSongCard />
          <VerticalSongCard />
          <VerticalSongCard />
          <VerticalSongCard />
          <VerticalSongCard />
          <VerticalSongCard />
          <VerticalSongCard />
          <VerticalSongCard />
          <VerticalSongCard />
          <VerticalSongCard />
          <VerticalSongCard />
          <VerticalSongCard />
          <VerticalSongCard />
        </Box>
      </div >
    </>
  )
}

export default App
