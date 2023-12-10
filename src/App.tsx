import './App.css'
import Header from './components/Header/Header';
import { PlaylsitDataDTO } from './dto/playlistDataDTO';
import TreadingPage from './pages/TrendingPage';
import { GetSpotifyDataAsJSON } from './services/getApiData';
import { useState, useEffect } from 'react'
import AudioPlayer from './components/AudioPlayer/AudioPlayer'

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
      <div>
        <Header />
        {data && <TreadingPage data={data} />}
        {/* {data && <AudioPlayer playlist={data.track.item.map(item) => {
            title: ;
  url: string
        }}/>} */}
      </div >
    </>
  )
}

export default App
