import React, { useState, useEffect } from "react";
import CustomButton from "../../components/custom-button/custom-button.component";
import FormInput from "../../components/form-input/form-input.component";
import { MultiSelect } from "react-multi-select-component";
import {connect} from 'react-redux'
import { useNavigate } from "react-router";
import axios from 'axios'
const CreatePlaylist = ({userData, state}) => {
  let navigate = useNavigate()
  const[options, setOptions] = useState([])
  const loadSongs = async()=>{
    let config = {
      headers:{
          "Authorization": 'Bearer '+ sessionStorage.getItem('token'),
          'content-type': 'text/json'
      }
    }
    let {data} = await axios.get("http://localhost:3000/songs/fetchSongForPlaylistForm", config)
    setOptions(data)
  }
  
  const postPlaylist=async(val)=>{
    console.log(val)
    let config = {
      headers:{
          "Authorization": 'Bearer '+ sessionStorage.getItem('token'),
          'content-type': 'application/json'
      }
  }
    let id = userData.data._id
    let {data} = await axios.post("http://localhost:3000/playlists/", val, config)
    console.log(data)
    navigate('/playlists')
  }
  const reqBody ={}
  useEffect(() => {
     loadSongs()
   }, [])

  
  const [values, setValues] = useState({
    playlistName: "",
    description: "",
    songs: [],
  });
  const [selected, setSelected] = useState([]);

  useEffect(()=>{
    
    // values.songs=songs
  },[selected, values])
  const handleNameInputChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      playlistName: event.target.value,
    }));
  };
  const handleDescInputChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      description: event.target.value,
    }));
  };

 
  const handleRequest = () => {
    // let data = selected.map(select => select.value);
    // setSelected((val)=>({
    //   ...data
    // }))
    values.songs = selected.map(select => select.value);
    // call the postPlaylist function with the updated values object
    postPlaylist(values);
    // console.log(data)
    // postPlaylist(values)
  };
  return (
    <div style={{maxWidth:'60%', alignSelf:'center'}}>
      <FormInput
        name="name"
        type="text"
        handleChange={handleNameInputChange}
        value={values.name}
        label="Name:"
        required
      />
      <FormInput
        name="description"
        type="text"
        handleChange={handleDescInputChange}
        value={values.desc}
        label="Description:"
        required
      />
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy="Select: "
      />
      <button
        onClick={() => {
          handleRequest()
        }}
      >
        Add
      </button>
      </div>
  );
};

const mapStateToProps = state => {
  console.log(state )
  // console.log(state)
  return {
    userData: state.user,
    state:state
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePlaylist)
