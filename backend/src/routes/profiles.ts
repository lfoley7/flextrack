import express, { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt'
import { User } from '../entities/user.entity.js';
import { LoginCredential } from '../entities/login-credential.entity.js';
import { initORM } from '../db.js';
import { FitnessProfile } from '../entities/fitness-profile.entity.js';

export async function registerProfileRoutes(router: Router): Promise<express.Router> {

  const db = await initORM();

  router.get("/get-all", async (req, res) => {
    let userId = "";
    const errorMsg = 'Failed to get profiles'
    
    if(req.query.id){
      userId = (req.query.id).toString();
    }else if(req.session.userId){
      userId = req.session.userId;
    }else{
      res.status(500).json({ error: errorMsg });
    }
    const user: User = await db.user.findOne({id: +userId},{ populate: ['profile', 'friends']});

    if(user == null) {
      console.error(errorMsg);
      res.status(500).json({ error: errorMsg });
    }else{
      try {
        const profiles = await db.profile.findAll();
        const filteredProfiles = profiles.filter((profile) => {return profile != user.profile})

        const friendProfiles = filteredProfiles.map((profile: FitnessProfile) => {
            let friend = user.friends.contains(profile.user);
            return {...profile, friend: friend};
        })
        console.log(friendProfiles);
        res.status(200).json(friendProfiles);
        return
      } catch (error) {
          console.error(errorMsg+':', error);
          res.status(500).json({ error: errorMsg });
      }
    }
  });

  router.get("/get", async (req, res) => {
    let userId = "";
    const errorMsg = 'Failed to get profile'
    
    if(req.query.id){
      userId = (req.query.id).toString();
    }else if(req.session.userId){
      userId = req.session.userId;
    }else{
      res.status(500).json({ error: errorMsg });
    }
    const user: User = await db.user.findOne({id: +userId},{ populate: ['profile']});
    
    if(user == null) {
      console.error(errorMsg);
      res.status(500).json({ error: errorMsg });
    }else{
      try {
        res.status(200).json(user.profile);
      } catch (error) {
          console.error(errorMsg+':', error);
          res.status(500).json({ error: errorMsg });
      }
    }
  });

  router.get("/get", async (req, res) => {
    let userId = "";
    const errorMsg = 'Failed to get profile'
    
    if(req.query.id){
      userId = (req.query.id).toString();
    }else if(req.session.userId){
      userId = req.session.userId;
    }else{
      res.status(500).json({ error: errorMsg });
    }
    const user: User = await db.user.findOne({id: +userId},{ populate: ['profile']});
    
    if(user == null) {
      console.error(errorMsg);
      res.status(500).json({ error: errorMsg });
    }else{
      try {
        res.status(200).json(user.profile);
      } catch (error) {
          console.error(errorMsg+':', error);
          res.status(500).json({ error: errorMsg });
      }
    }
  });

  router.post("/update", async (req, res) => {
    let userId = "";
    const errorMsg = 'Failed to update profile'
    const { username, height, weight, deadlift, squat, ohp, bench, description } = req.body;

    if(req.query.id){
      userId = (req.query.id).toString();
    }else if(req.session.userId){
      userId = req.session.userId;
    }else{
      res.status(500).json({ error: errorMsg });
    }
    const user: User = await db.user.findOne({id: +userId},{ populate: ['profile']});

    if(user == null) {
      console.error(errorMsg);
      res.status(500).json({ error: errorMsg });
    }else{
      try {
        
        user.profile.username = username ? username : username.profile.height;
        user.profile.height = height ? height : user.profile.height;
        user.profile.weight = weight ? weight : user.profile.weight;
        user.profile.deadlift = deadlift ? deadlift : user.profile.deadlift;
        user.profile.squat = squat ? squat : user.profile.squat;
        user.profile.ohp = ohp ? ohp : user.profile.ohp;
        user.profile.bench = bench ? bench : user.profile.bench;
        user.profile.description = description ? description : user.profile.description;

        await db.em.persistAndFlush(user);
        res.status(200).json(user.profile);
      } catch (error) {
          console.error(errorMsg+':', error);
          res.status(500).json({ error: errorMsg });
      }
    }
  });

  return router;
}