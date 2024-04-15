import express, { Router } from 'express';
import { initORM } from '../db';
import { WorkoutSession } from '../entities/workout-session.entity';
import { Collection } from '@mikro-orm/core';
import { SessionSet } from '../entities/set.entity';

export async function registerWorkoutRoutes(router: Router): Promise<express.Router> {

  const db = await initORM();

  router.get("/get-all", async (req, res) => {
    let userId = "";
    
    if(req.query.id){
      userId = (req.query.id).toString();
    }else if(req.session.userId){
      userId = req.session.userId;
    }else{
      res.status(500).json({ error: 'Failed to get plans' });
    }
    const user = await db.user.findOne({id: +userId},{ populate: ['plans.*']});
  
    if(user == null) {
      console.error('Error getting plans');
      res.status(500).json({ error: 'Failed to get plans' });
    }else{
      try {
        res.status(200).json(user.plans);
      } catch (error) {
          console.error('Error getting plans:', error);
          res.status(500).json({ error: 'Failed to get plans'});
      }
    }
  });
  
  router.post("/create", async (req, res) => {
    const { name } = req.body;
  
    let userId = "";
  
    if(req.query.id){
      userId = (req.query.id).toString();
    }else if(req.session.userId){
      userId = req.session.userId;
    }else{
      res.status(500).json({ error: 'Failed to get plans' });
    } 

    const user = await db.user.findOne({id: +userId});

    if(user == null) {
      console.error('Error creating plan');
      res.status(500).json({ error: 'Error creating plan' });
    }else{
      try {
        const plan = db.workoutPlan.create({ name: name,  user: user });
        await db.em.persistAndFlush(plan);
        res.status(200).json({ plan: plan});
      } catch (error) {
          console.error('Error creating plan:', error);
          res.status(500).json({ error: 'Error creating plan' });
      }
    }
  });
  
  router.post("/add-sessions", async (req, res) => {
    const { sessions, plan_id } = req.body;
  
    let userId = "";
  
    if(req.query.id){
      userId = (req.query.id).toString();
    }else if(req.session.userId){
      userId = req.session.userId;
    }else{
      res.status(500).json({ error: 'Failed to add sessions' });
    } 

    const user = await db.user.findOne({id: +userId},{ populate: ['plans.sessions']});

    if(user == null) {
      console.error('Error adding sessions to plan');
      res.status(500).json({ error: 'Error adding sessions to plan' });
    }else{
      try {
        const plan = user.plans.find((plan) => {return plan.id === plan_id})
        if(plan == null) {
            console.error('Error adding sessions to plan');
            res.status(500).json({ error: 'Error adding sessions to plan' });
        }else{
            const workoutSessions = await Promise.all<WorkoutSession>(sessions.map(async (session: {
                sets: any; day_of_week: string; workout_type: string; 
            }) => {

                const sets = await Promise.all<SessionSet>(session.sets.map(
                    async (set: {
                        set_number: number,
                        exercise_id: number,
                        target_weight: number,
                        target_reps: number
                    }) => {

                        const exercise = await db.exercise.findOne({id: set.exercise_id});
                        if(exercise == null){
                            throw new Error("Exercise not found");
                           
                        }else{
                            return new SessionSet(set.set_number, exercise, set.target_weight, set.target_reps)
                        }
                }))
                console.log(sets)
                return new WorkoutSession(session.day_of_week, session.workout_type, plan, sets)
            }))

            plan.addSessions(workoutSessions)
            await db.em.persistAndFlush(plan);
            res.status(200).json({ plan: plan});
        }
      } catch (error) {
          console.error('Error adding sessions to plan:', error);
          res.status(500).json({ error: 'Error adding sessions to plan' });
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
      res.status(500).json({ error: 'Failed to delete plan' });
    } 

    const user = await db.user.findOne({id: +userId});

    if(user == null) {
      console.error('Error deleting plan');
      res.status(500).json({ error: 'Error deleting plan' });
    }else{
      try {
        if(req.query.id != null) {
          const plan = db.workoutPlan.nativeDelete({id: +req.query.id});
          res.status(200).json({ plan: plan});
        }else {
          console.error('Error deleting plan');
          res.status(500).json({ error: 'Error deleting plan' });
        }
      } catch (error) {
          console.error('Error creating plan:', error);
          res.status(500).json({ error: 'Error creating plan' });
      }
    }
  });

  return router;
}