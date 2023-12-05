import appConfigs from '@/config/appConfigs';
import spotifyAxiosInstance from './axiosInstance/spotify';
import axios, { AxiosRequestConfig } from 'axios';

const { client_secret, client_id } = appConfigs.spotify;

const getSpotifyAccessToken = async () => {
    const token = localStorage.getItem('spotifyAccessToken')
    if (token) return token

    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        method: 'post',
        headers: {
            'Authorization': 'Basic ' + atob(client_id + ':' + client_secret),
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: 'grant_type=client_credentials',
    };

    const result = await axios(authOptions)
        .then(response => {
            const token = response.data.access_token;
            console.log('Access Token:', token);
        })
        .catch(error => {
            console.error('Error getting access token:', error.response ? error.response.data : error.message);
        });

    console.log(result)
}

export const GetSpotifyDataAsJSON = async<TResult = unknown>(
    url: string,
    config: AxiosRequestConfig = {}
): Promise<TResult> => {
    console.log(url, config, "get api data")
    const token = await getSpotifyAccessToken()
    const response = await spotifyAxiosInstance.get<TResult>(url, {
        ...config,
        headers: {
            'Content-Type': 'application/json',
            ...config.headers,
        },
    });
    return response.data;
}

