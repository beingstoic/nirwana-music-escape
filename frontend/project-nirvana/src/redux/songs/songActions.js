import axios from 'axios';
import { FETCH_SONG_TO_PLAY_SUCCESS, FETCH_SONG_TO_PLAY_FALIURE, FETCH_SONG_TO_PLAY, UPLOAD_SONG, UPLOAD_SONG_FAILURE, UPLOAD_SONG_SUCCESS, CLEAN_DATA } from "./songActionTypes";

export const fetchSongToPlay = () => {
    return {
        type: FETCH_SONG_TO_PLAY
    };
};

export const fetchSongToPlaySuccess = (songs) => {
    return {
        type: FETCH_SONG_TO_PLAY_SUCCESS,
        payload: songs
    };
};

export const fetchSongToPlayFaliure = (error) => {
    return {
        type: FETCH_SONG_TO_PLAY_FALIURE,
        payload: error
    };
};

export const uploadSong = () => {
    return {
        type: UPLOAD_SONG
    };
};

export const uploadSongSuccess = (song) => {
    return {
        type: UPLOAD_SONG_SUCCESS,
        payload: song
    };
};

export const uploadSongFailure = (error) => {
    return {
        type: UPLOAD_SONG_FAILURE,
        payload: error
    };
};

export const cleanData = () => {
    return {
        type: CLEAN_DATA
    };
};


export const fetchSongToPlayAPICall = (_id) => {
    return async (dispatch) => {
        dispatch(fetchSongToPlay());
        try {
            let config = {
                headers:{
                    "Authorization": 'Bearer '+ sessionStorage.getItem('token'),
                    'content-type': 'text/json'
                }
            }
        let resp = await axios.get('http://localhost:3000/songs/'+_id, config);
            dispatch(fetchSongToPlaySuccess(resp.data));
        } catch (error) {
            console.log(error);
        }
    };
};


export const uploadAPISongCall = (obj) => {
    return async (dispatch) => {
        // dispatch(cleanData());
        dispatch(uploadSong());
        try {
            let config = {
                    headers:{
                        "Authorization": 'Bearer '+ sessionStorage.getItem('token'),
                        'content-type': 'text/json'
                    }
            }
            let resp = await axios.post('http://localhost:3000/songs', obj, config);
            dispatch(uploadSongSuccess(resp.data));
        } catch (error) {
            dispatch(uploadSongFailure(error));

        }
    };
};

export const cleanUploadSong = () => {
    return async (dispatch) => {
        dispatch(cleanData());
    };
};
