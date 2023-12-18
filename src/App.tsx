import './App.css'
import Header from './components/Header/Header';
import { PlaylsitDataDTO } from './dto/playlistDataDTO';
import TreadingPage from './pages/TrendingPage';
import { GetSpotifyDataAsJSON } from './services/getApiData';
import { useState, useEffect } from 'react'
import AudioPlayer from './components/AudioPlayer/AudioPlayer'
import { Box } from '@mui/material';
import PlaylistCard from './components/PlaylistCard/PlaylistCard';

const App = () => {


  const [data, setData] = useState()

  // const getTrendingData = async () => {

  //   const trendingResponse = await GetSpotifyDataAsJSON<PlaylsitDataDTO>("/playlists/37i9dQZEVXbLZ52XmnySJg", {
  //     params: {},
  //   });
  //   setData(trendingResponse)
  //   return trendingResponse
  // }

  const getTrendingData = async () => {

    const trendingResponse = await GetSpotifyDataAsJSON<PlaylsitDataDTO>("browse/featured-playlists?limit=24", {
      params: {},
    });
    setData(trendingResponse)
    return trendingResponse
  }

  // const getTrendingData = async () => {

  //   const trendingResponse = await GetSpotifyDataAsJSON<PlaylsitDataDTO>("browse/categories?limit=50", {
  //     params: {},
  //   });
  //   setData(trendingResponse)
  //   return trendingResponse
  // }
  useEffect(() => {
    getTrendingData()
  }, [])

  console.log(data, "data")
  return (
    <>
      <Box className={"relative"}>
        <Header />
        {/* {data && <TreadingPage data={data} />} */}
        {/* {data && <AudioPlayer playlist={data?.tracks?.items.map((item) => {
          return {
            title: item.track.name,
            url: item.track?.preview_url ? item.track?.preview_url : "",
            image: item.track.album.images[0].url,
            id: item.track.id
          }
        })}
        />
        } */}
        <Box className="flex flex-wrap gap-4">
          {data && data?.playlists.items.map((item) => {
            return (
              <PlaylistCard details={{
                image: item.images[0].url,
                name: item.name,
                description: item.description,
              }} />
            )
          })}
        </Box>
      </Box >
    </>
  )
}

export default App
