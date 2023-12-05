import axios from 'axios';

const tmdbAxiosInstance = axios.create({
    baseURL: 'https://api.spotify.com/v1/',
});

tmdbAxiosInstance.interceptors.request.use((config) => {
    config.params = {
        ...config.params,
    }
    return config
})

export default tmdbAxiosInstance;
