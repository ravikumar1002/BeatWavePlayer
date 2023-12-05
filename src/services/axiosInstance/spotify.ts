import axios from 'axios';

const spotifyAxiosInstance = axios.create({
    baseURL: 'https://api.spotify.com/v1/',
});

spotifyAxiosInstance.interceptors.request.use((config) => {
    config.params = {
        ...config.params,
    }
    return config
})

export default spotifyAxiosInstance;
