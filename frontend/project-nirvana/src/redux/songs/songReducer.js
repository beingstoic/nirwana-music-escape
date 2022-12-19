import { FETCH_SONG_TO_PLAY_SUCCESS, FETCH_SONG_TO_PLAY_FALIURE, FETCH_SONG_TO_PLAY, UPLOAD_SONG, UPLOAD_SONG_FAILURE, UPLOAD_SONG_SUCCESS, CLEAN_DATA } from "./songActionTypes";

const initialState = {
    playerSong: [],
    songUploadData: {},
    songUploadError: '',
    status: '',
    redirect: false
};
export const playerReducer = (state = (initialState), action) => {
    switch (action.type) {
        case FETCH_SONG_TO_PLAY_SUCCESS:
            return {
                ...state, playerSong: action.payload
            };
        case FETCH_SONG_TO_PLAY_FALIURE: return {
            ...state, error: action.payload
        };
        case UPLOAD_SONG: return {
            ...state,
        };
        case UPLOAD_SONG_SUCCESS: return {
            ...state, songUploadData: action.payload, songUploadError: "", status: "OK"
        };
        case UPLOAD_SONG_FAILURE: return {
            ...state, songUploadError: action.payload.response.data
        };
        case CLEAN_DATA: return {
            ...state, songUploadData: {}
        };
        default: return state;
    }
};