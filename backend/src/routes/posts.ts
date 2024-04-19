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

    const posts: Post[] = await db.post.findAll({ populate: ['created_by.profile.username','comments']});

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

  router.post("/create", async (req, res) => {
    const errorMsg = 'Failed to create post'
    const { title, caption, date } = req.body;
  
    let userId = "";
  
    if(req.query.id){
      userId = (req.query.id).toString();
    }else if(req.session.userId){
      userId = req.session.userId;
    }else{
      res.status(500).json({ error: errorMsg });
    } 

    const user = await db.user.findOne({id: +userId});

    if(user == null) {
      console.error(errorMsg);
      res.status(500).json({ error: errorMsg });
    }else{
      try {
        const post = db.post.create({ title: title, caption: caption, date: date, created_by: user });
        await db.em.persistAndFlush(post);
        res.status(200).json({ post: post});
      } catch (error) {
          console.error(errorMsg+':', error);
          res.status(500).json({ error: errorMsg });
      }
    }
  });

  return router;
}