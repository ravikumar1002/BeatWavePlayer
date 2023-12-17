import './App.css'
import Header from './components/Header/Header';
import { PlaylsitDataDTO } from './dto/playlistDataDTO';
import TreadingPage from './pages/TrendingPage';
import { GetSpotifyDataAsJSON } from './services/getApiData';
import { useState, useEffect } from 'react'
import AudioPlayer from './components/AudioPlayer/AudioPlayer'
import { Box } from '@mui/material';

const App = () => {


  const [data, setData] = useState<PlaylsitDataDTO>()

  const getTrendingData = async () => {

    const trendingResponse = await GetSpotifyDataAsJSON<PlaylsitDataDTO>("/playlists/37i9dQZEVXbLZ52XmnySJg", {
      params: {},
    });
    setData(trendingResponse)
    return trendingResponse
  }

  useEffect(() => {
    getTrendingData()
  }, [])


  return (
    <>
      <Box className={"relative"}>
        <Header />
        {data && <TreadingPage data={data} />}
        {data && <AudioPlayer playlist={data?.tracks?.items.map((item) => {
          return {
            title: item.track.name,
            url: item.track?.preview_url ? item.track?.preview_url : "",
            image: item.track.album.images[0].url,
            id: item.track.id
          }
        })}
        />
        }
      </Box >
    </>
  )
}

export default App
