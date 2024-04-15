import express, { Router } from 'express';
import { initORM } from '../db';

export async function registerExerciseRoutes(router: Router): Promise<express.Router> {

  const db = await initORM();

  router.get("/get-all", async (req, res) => {
    let userId = "";
    
    if(req.query.id){
      userId = (req.query.id).toString();
    }else if(req.session.userId){
      userId = req.session.userId;
    }else{
      res.status(500).json({ error: 'Failed to get exercises' });
    }
    const user = await db.user.findOne({id: +userId},{ populate: ['exercises']});
  
    if(user == null) {
      console.error('Error getting exercises');
      res.status(500).json({ error: 'Failed to get exercises' });
    }else{
      try {
        res.status(200).json(user.exercises);
      } catch (error) {
          console.error('Error getting exercises:', error);
          res.status(500).json({ error: 'Failed to get exercises' });
      }
    }
  });
  
  router.post("/create", async (req, res) => {
    const { name, targetMuscle } = req.body;
  
    let userId = "";
  
    if(req.query.id){
      userId = (req.query.id).toString();
    }else if(req.session.userId){
      userId = req.session.userId;
    }else{
      res.status(500).json({ error: 'Failed to get exercises' });
    } 

    const user = await db.user.findOne({id: +userId});

    if(user == null) {
      console.error('Error creating exercise');
      res.status(500).json({ error: 'Error creating exercise' });
    }else{
      try {
        const exercise = db.exercise.create({ name: name, targetMuscle: targetMuscle, user: user });
        await db.em.persistAndFlush(exercise);
        res.status(200).json({ exercise: exercise});
      } catch (error) {
          console.error('Error creating exercise:', error);
          res.status(500).json({ error: 'Error creating exercise' });
      }
    }
  });
  
  router.delete("/delete", async (req, res) => {
    let userId = "";
  
    if(req.query.id){
      userId = (req.query.id).toString();
    }else if(req.session.userId){
      userId = req.session.userId;
    }else{
      res.status(500).json({ error: 'Failed to get exercises' });
    } 

    const user = await db.user.findOne({id: +userId});

    if(user == null) {
      console.error('Error creating exercise');
      res.status(500).json({ error: 'Error creating exercise' });
    }else{
      try {
        if(req.query.id != null) {
          const exercise = db.exercise.nativeDelete({id: +req.query.id});
          res.status(200).json({ exercise: exercise});
        }else {
          console.error('Error deleting exercise');
          res.status(500).json({ error: 'Error deleting exercise' });
        }
      } catch (error) {
          console.error('Error creating exercise:', error);
          res.status(500).json({ error: 'Error creating exercise' });
      }
    }
  });

  return router;
}