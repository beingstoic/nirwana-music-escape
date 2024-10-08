import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormInput from '../form-input/form-input.component';
import FormInput2 from "../form-input2/form-input2.component";
import CustomButton from '../custom-button/custom-button.component';
import { uploadAPISongCall, cleanUploadSong } from "../../redux/songs/songActions";

import './admin.css';

const Admin = ({ songData, uploadAPISongCall, cleanUploadSong }) => {

  const [songName, setSongName] = useState('');
  const [song, setSong] = useState();
  const [songNameInFile, setSongNameByFile] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [genre, setGenre] = useState('');
  const [artist, setArtist] = useState('');

  let navigate = useNavigate();

  // when comes from redirect clean songs data

  useEffect(() => {
    if (songData.playerSong.songUploadData && songData.playerSong.status == "OK") {
      navigate("/admin-portal");
    } else if (songData.playerSong.songUploadError) {
      setErrorMessage('Error: ' + songData.playerSong.songUploadError);
    }
  }, [songData]);

  function formDataToJson(formData) {
    const obj = {};
    formData.forEach((value, key) => {
      obj[key] = value;
    });
    return JSON.stringify(obj);
  }

  const handleSubmit = async event => {
    event.preventDefault();

    const obj = {
      songName: songName,
      song: "public/"+songName+".mp3",
      genre: genre,
      artist: artist
    }
    uploadAPISongCall(obj);
  };

  const handleChange = event => {
    const { value, name, files } = event.target;

    if (name == 'songName') {
      setSongName(value);
    } else if (name == 'song') {
      setSong(files[0]);
      setSongNameByFile(files[0].name);
    } else if (name == 'genre') {
      setGenre(value);
    } else if (name == 'artist') {
      setArtist(value);
    }
  };


  const handleRequest = () => {
    navigate("/admin-portal");
  };

  return (
    <div className='Auth-form-container'>
      <div className='spaces'>
      <h1>Upload song to Nirwana</h1>
      <CustomButton onClick={handleRequest}> Or Delete Songs </CustomButton>
      </div>

      <form onSubmit={handleSubmit} className='Auth-form'>
        <div className="Auth-form-content">

          <FormInput
            name='songName'
            type='text'
            handleChange={handleChange}
            value={songName}
            label='Enter Song Name'
            required
          />
          {/* <FormInput2
            name='song'
            type='file'
            // value={songNameInFile}
            handleChange={handleChange}
            label='Upload Song'
            required
          /> */}
          <FormInput
            name='genre'
            type='text'
            value={genre}
            handleChange={handleChange}
            label='Enter Genre'
            required
          />
          <FormInput
            name='artist'
            type='text'
            value={artist}
            handleChange={handleChange}
            label='Enter Artist'
            required
          />
          {errorMessage && (
            <p className="error"> {errorMessage} </p>
          )}
          <div className='buttons'>
            <CustomButton type='submit'> Upload </CustomButton>
            

          </div>
        </div>
      </form>
    </div>
  );

};


const mapStateToProps = state => {
  return {
    songData: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    uploadAPISongCall: (obj) => dispatch(uploadAPISongCall(obj)),
    cleanUploadSong: () => dispatch(cleanUploadSong())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);