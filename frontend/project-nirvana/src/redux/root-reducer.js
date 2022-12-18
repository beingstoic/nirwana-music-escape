import { userReducer } from './users/userReducer';
import { songsReducer } from './generic/reducer';
import { playerReducer } from './songs/songReducer';
import { combineReducers } from 'redux';
import { playlistReducer } from './playlists/playlistReducer';
import { searchReducer } from './search/searchReducer';
export default combineReducers({
    user: userReducer,
    songs: songsReducer,
    playerSong: playerReducer,
    searchSong: searchReducer,
    playlists: playlistReducer
});