import express, { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt'
import { User } from '../entities/user.entity.js';
import { LoginCredential } from '../entities/login-credential.entity.js';
import { initORM } from '../db.js';
import { FitnessProfile } from '../entities/fitness-profile.entity.js';
import { Post } from '../entities/post.entity.js';

export async function registerPostRoutes(router: Router): Promise<express.Router> {

  const db = await initORM();

  router.get("/get-all", async (req, res) => {
    const errorMsg = 'Failed to get posts'

    const posts: Post[] = await db.post.findAll({ populate: ['created_by','comments']});

    if(posts == null) {
      console.error(errorMsg);
      res.status(500).json({ error: errorMsg });
    }else{
      try {
        posts.sort((a,b) => {
          if(a.date > b.date) {
            return 1;
          }else if (a.date < b.date) {
            return -1;
          }else{
            return 0;
          }
        })
        res.status(200).json(posts);
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