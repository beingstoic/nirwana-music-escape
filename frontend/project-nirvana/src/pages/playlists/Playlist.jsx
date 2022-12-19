import React, { useEffect } from 'react';
import { fetchPlaylistsAPICall } from '../../redux/playlists//playlistActions';
import SongCategory from '../../components/song-category/SongCategory';
import { connect } from 'react-redux';
import RenderPlaylist from '../../components/renderPlaylists.jsx/RenderPlaylist';
const Playlist = ({ userData, playlists, fetchPlaylistsAPICall }) => {
  useEffect(() => {
    let id = userData.data._id;
    fetchPlaylistsAPICall();
  }, []);
  return (
    <div style={{ display: 'grid', gridGap: '20px' }}>
      {
        playlists.playlists.filter(playlist => playlist.songs.length >= 1).map(playlist => <RenderPlaylist key={playlist._id}
          title={playlist.playlistName}
          songs={playlist.songs} />)
      }
    </div>
  );
};

const mapStateToProps = state => {
  return {
    userData: state.user,
    playlists: state.playlists
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPlaylistsAPICall: () => dispatch(fetchPlaylistsAPICall())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Playlist);