import React, {useEffect} from 'react'
import { useState } from 'react'
import { connect } from 'react-redux'
import SongCard from '../song-card/SongCard'

import './SongCategory.css'

const RenderPlaylist = ({searchSong, songs, title}) => {
    //console.log('here')
//  console.log(props)
 //console.log(items)
//  useEffect(() => {
//    if(search)
//  }, [searchSong])
const [songsForRender, setSongsFormRender]= useState(songs)
 
// useEffect(() => {
//     // if (typeof serachSong !== "undefined" && Object.keys(playerSong).length > 0)
//     console.log(searchSong)
//   }, [searchSong])
  console.log(songs)
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