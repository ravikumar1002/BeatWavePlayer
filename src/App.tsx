import { Box, Typography } from '@mui/material';
import './App.css'
import Header from './components/Header/Header';
import VerticalSongCard from './components/SongCard/VerticalSongCard';
// import { GetSpotifyDataAsJSON } from './services/getApiData';

// export const getTrendingData = () => {

//   const trendingResponse = GetSpotifyDataAsJSON<any>("/trending/all/day", {
//     params: {
//     },
//   });

//   return trendingResponse
// }

function App() {

  // const authOptions = {
  //   url: 'https://accounts.spotify.com/api/token',
  //   headers: {
  //     'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
  //   },
  //   form: {
  //     grant_type: 'client_credentials'
  //   },
  //   json: true
  // };

  // request.post(authOptions, function (error, response, body) {
  //   if (!error && response.statusCode === 200) {
  //     var token = body.access_token;
  //   }
  // });

  // const trendingData = getTrendingData();

  // console.log(trendingData)

  return (
    <>
      <div>
        <Header />
        <Box sx={{
          animationDuration: "0.3s",
          animationFillMode: "forwards",
          display: "block",
          animationName: "dmNUZD",
          transform: "translateY(100%)",
          animationPlayState: "running"
        }}>
          <Box sx={{
            padding: "2rem"
          }} >
            <Typography variant='h4' className='p-4' sx={{
              fontWeight: "bold",
            }}>Weekly Top Songs Global</Typography>
            <Typography variant='body1' className='p-4' sx={{
              color: "gray",
              fontWeight: 500,
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
      </div>
    </>
  )
}

export default App
