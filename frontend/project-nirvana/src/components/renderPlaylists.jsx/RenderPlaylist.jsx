import React, {useEffect} from 'react'
import { useState } from 'react'
import { connect } from 'react-redux'
import SongCard from '../song-card/SongCard'

import './SongCategory.css'

const RenderPlaylist = ({searchSong, songs, title}) => {

const [songsForRender, setSongsFormRender]= useState(songs)
 
  return (
    <div className='category-viewer'>
        <h1 className="title">{title}</h1>
        <div className='category-list'>
        {
            songs.filter((song, idx)=>idx<4).map((song)=>(
              <SongCard key={song._id} item={song} />
          ))
        }
        </div>
        
    </div>
  )
}
const mapStateToProps = state => {
    return {
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      // fetchSongToPlayAPICall:(obj)=>dispatch(fetchSongToPlayAPICall(obj))
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(RenderPlaylist)