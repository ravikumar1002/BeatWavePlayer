import appConfigs from '../config/appConfigs';
import axios, { AxiosRequestConfig } from 'axios';
import spotifyAxiosInstance from './axiosInstance/spotify';

const { client_id, client_secret } = appConfigs.spotify;

export const getSpotifyAccessToken = async () => {
    const tokenexpiresIn = localStorage.getItem('spotifyAccesstokenexpiresIn')
    const spotifyAccessToken = localStorage.getItem('spotifyAccessToken')

    console.log(client_id, client_secret)
    const currentTime = Math.floor(Date.now() / 1000)
    if (currentTime && Number(tokenexpiresIn) > Number(currentTime)) return spotifyAccessToken
    const enc = `${client_id}:${client_secret}`.toString('base64');
    let accessToken;
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${btoa(enc)}`,
        },
        data: 'grant_type=client_credentials',
    };

    await axios(authOptions)
        .then(response => {
            const token = response.data;
            localStorage.setItem("spotifyAccessToken", token.access_token);
            localStorage.setItem("spotifyAccesstokenexpiresIn", `${Math.floor(Date.now() / 1000) + 3600}`);
            accessToken = token.access_token
        })
        .catch(error => {
            console.error('Error getting access token:', error.response ? error.response.data : error.message);
        });

    return accessToken
}

export const GetSpotifyDataAsJSON = async<TResult = unknown>(
    url: string,
    config: AxiosRequestConfig = {}
): Promise<TResult> => {
    const token = await getSpotifyAccessToken()
    const response = await spotifyAxiosInstance.get<TResult>(url, {
        ...config,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            ...config.headers,
        },
    });
    return response.data;
}

