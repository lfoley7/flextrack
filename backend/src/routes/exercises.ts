import express from 'express';
import { Exercise } from '../entities/Exercise.model';

const router = express.Router();

router.get("/get-all", async (req, res) => {
  let userId = "";
  
  if(req.query.id){
    userId = (req.query.id).toString();
  }else if(req.session.userId){
    userId = req.session.userId;
  }else{
    res.status(500).json({ error: 'Failed to get exercises' });
  }

  const exercises: Exercise[] = await Exercise.findAll({where: {userId: userId}});

  try {
      res.status(200).json(exercises);
  } catch (error) {
      console.error('Error creating user and credentials:', error);
      res.status(500).json({ error: 'Failed to get exercises' });
  }
});

router.post("/create", async (req, res) => {
  const { name, targetMuscle } = req.body;

  try {

    if(req.session.userId == null) {
      res.status(500).json({ error: 'Failed to create exercise' });
    }  
  
    let userId = req.session.userId;

    const exercise = await Exercise.create({name: name, targetMuscle: targetMuscle, userId: +userId})
    res.status(200).json({ exercise: exercise});
  } catch (error) {
    console.error('Error creating user and credentials:', error);
    res.status(500).json({ error: 'Failed to create exercise' });
  }
});

router.delete("/delete", async (req, res) => {
  try {

    if(!req.query.id){
      res.status(500).json({ error: 'Failed to create exercise' });
    }

    const exercise = await Exercise.destroy({where: {id: +req.query.id}})
    res.status(200).json({ exercise: exercise});
  } catch (error) {
    console.error('Error creating user and credentials:', error);
    res.status(500).json({ error: 'Failed to create exercise' });
  }
});

export default router;