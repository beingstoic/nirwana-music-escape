const express = require("express");
const router = express.Router();
const helpers = require("../helpers");
const data = require("../data");
const {protect} = require('../middleware/authJwt')
const playlistData = data.playlistsData;
const { isProperString, isPasswordValid } = require("../helpers");
const { response } = require("express");
const asyncHandler = require('express-async-handler')

  
  
  router.route("/").get(async (req, res) => {
    if (req.session.user) return res.redirect("/protected");
    res.status(401).send('dkjhfrwej');
  });
  
  router
    .route("/:userId")
    .get(async (req, res) => {
      try{
        //helper
      }catch(e){
        return res.status(400).json({ error:e });
      }
      try {
        let playlistGet = await playlistData.getAllPlaylist(req.params.userId);
        res.json(playlistGet)
      }catch(e){
       return res.status(404).json({ error:e })
      }
    })
    .post(async (req, res) => {
        
        const playlistPost = req.body
        try{
            //helper
            let response = await playlistData.createPlaylist(req.params.userId, req.body);
            return res.status(201).json(response)
        } catch (e) {
            res.sendStatus(400).json({'error':e});
        }
        });

  
  
  module.exports = router;