const express = require("express");
const router = express.Router();
const helpers = require("../helpers");
const data = require("../data");
const {protect} =require('../middleware/authJwt')
const songsData = data.songsData;

router
  .route("/")
  .get(async (req, res) => {
    try {
      let token = protect(req.headers)
      req.user = token.id
    } catch (error) {
      return res.status(401).send(error)
    }
    try {
      let response = await songsData.fetchSongs(req.query.sort_by);
      return res.status(200).json(response);
    } catch (error) {
      if (error !== "Could not get all songs") {
        return res.status(500).json("Internal Server Error");
      } else {
        return res.status(400).json(error);
      }
    }
  })
  .post(async (req, res) => {
    // let { body } = req.body;
    // body {"songName":"Break My Heart Again","song":"[object FileReader]","genre":"k-pop","artist":"90degree"}
    // if (Object.keys(body).length === 0){
    //   return res.status(400).json("Invalid Data");
    // }
    // var obj = JSON.parse(body);
    // let { songName, song, genre, artist } = req.body;

    // try {
    //   // TO DO: ADD re.body field validation in another try cath
    //   // validation
    //   helpers.inputStringValidation(songName, "songName");
    //   helpers.inputStringValidation(song, "song");
    //   helpers.inputStringValidation(genre, "genre");
    //   helpers.inputStringValidation(artist, "artist");
    // } catch (error) {
    //   return res.status(400).json(error);
    // }

    try {
      let token = protect(req.headers)
      req.user = token.id
    } catch (error) {
      return res.status(401).send(error)
    }
    try {
      // TO DO: ADD re.body field validation in another try cath
      let response = await songsData.uploadSong(req.body);
      return res.status(201).json(response);
    } catch (error) {
      return res.status(400).json(error);
    }
  });

router
  .route("/fetchSongForPlaylistForm")
  .get(async (req, res) => {
    try {
      let token = protect(req.headers)
      req.user = token.id
    } catch (error) {
      return res.status(401).send(error)
    }
    try {
      let response = await songsData.fetchSongForPlaylistForm();
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400);
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      let token = protect(req.headers)
      req.user = token.id
    } catch (error) {
      return res.status(401).send(error)
    }
    try {
      // TO DO: ADD id validation in another try cath

      helpers.inputStringValidation(req.params.id, "id");
    } catch (error) {
      return res.status(400).json(error);
    }
    try {
      let response = await songsData.fetchSong(req.params.id);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json(error);
    }
  })
  .delete(async (req, res) => {
    try {
      let token = protect(req.headers)
      req.user = token.id
    } catch (error) {
      return res.status(401).send(error)
    }
    try {
      // TO DO: ADD id fiekld validation in another try cath

      helpers.inputStringValidation(req.params.id, "id");
    } catch (error) {
      return res.status(400).json(error);
    }
    try {
      let response = await songsData.deleteSong(req.params.id);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json(error);
    }
  });

module.exports = router;

// handle response codes