const express = require("express");
const router = express.Router();
const helpers = require("../helpers");
const data = require("../data");
const asyncHandler = require('express-async-handler')
const songsData = data.songsData;
const {protect} = require('../middleware/authJwt')

const fetchSongs= asyncHandler(async (req, res) => { 
  let id =req.decodedId
  console.log(res)
  async (req, res) => {
    try{
      console.log(res.decodedId)
      let response = await songsData.fetchSongs(req.query.sort_by);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
})

const uploadSong = asyncHandler(async (req, res) => {
  try{
    // TO DO: ADD re.body field validation in another try cath

    console.log("req.body",req.body)
    let response = await songsData.uploadSong(req.body);
    return res.status(201).json(response);
  } catch (error) {
    console.log("error",error)
    return res.send(400).json(error);
  }
})

const fetchSongForPlaylistForm = asyncHandler(async (req, res) => {
  try{
    console.log("here")
    let response = await songsData.fetchSongForPlaylistForm();
    return res.status(200).json(response);
  } catch (error) {
    return res.sendStatus(400);
  }
})
router.get('/', protect, fetchSongs)
router.post('/', protect, uploadSong)
router.get("/fetchSongForPlaylistForm", protect, fetchSongForPlaylistForm)
router
  .route("/:id")
  .get(async (req, res) => {
    try{
      console.log("here")
      // TO DO: ADD id validation in another try cath

      let response = await songsData.fetchSong(req.params.id);
      return res.status(200).json(response);
    } catch (error) {
      console.log("error",error)
      return res.status(400).json(error);
    }
  })
  .delete(async (req, res) => {
    try{
    // TO DO: ADD id fiekld validation in another try cath

      let response = await songsData.deleteSong(req.params.id);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json(error);
    }
  });
 // const fetchSongsById = asyncHandler(async (req, res) => {
    //   try{
    //     console.log("here")
    //     // TO DO: ADD id validation in another try cath
    
    //     let response = await songsData.fetchSong(req.params.id);
    //     return res.status(200).json(response);
    //   } catch (error) {
    //     console.log("error",error)
    //     return res.send(400).json(error);
    //   }
    // })
    // const deleteSongById = asyncHandler(asyncHandler(async(req, res)=>{
    //   try{
    //     // TO DO: ADD id fiekld validation in another try cath
    
    //       let response = await songsData.deleteSong(req.params.id);
    //       return res.status(200).json(response);
    //     } catch (error) {
    //       return res.send(400).json(error);
    //     }
    // }))
  



module.exports = router;



// handle response codes