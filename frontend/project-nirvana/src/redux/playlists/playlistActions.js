import { FETCH_PLAYLIST_SUCCESS, FETCH_PLAYLIST_FALIURE, FETCH_PLAYLIST } from "./PlaylistActionTypes";
import axios from 'axios'
export const fetchPlaylists = () => {
    return {
        type: FETCH_PLAYLIST
    };
};
export const fetchPlaylistsSuccess = (playlists) => {
    return {
        type: FETCH_PLAYLIST_SUCCESS,
        payload: playlists
    };
};

export const fetchPlaylistsFaliure = (error) => {
    return {
        type: FETCH_PLAYLIST_FALIURE,
        payload: error
    };
};

export const fetchPlaylistsAPICall = () => {
    return async (dispatch) => {
        dispatch(fetchPlaylists());
        try {
            let config = {
                headers:{
                    "Authorization": 'Bearer '+ sessionStorage.getItem('token'),
                }
        }
            let resp = await axios.get('http://localhost:3000/playlists/', config)
            console.log(resp)
            dispatch(fetchPlaylistsSuccess(resp.data))
        } catch (error) {
            console.log(error);
        }
    };
};