import express, { Router } from 'express';
import { initORM } from '../db.js';
import { WorkoutSession } from '../entities/workout-session.entity.js';
import { Collection } from '@mikro-orm/core';
import { SessionSet } from '../entities/set.entity.js';
import { setSafeTimers } from 'vitest/utils.js';

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
    const user = await db.user.findOne({id: +userId},{ populate: ['plans.sessions','plans.sessions.sets']});
  
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
    const { name, sessions } = req.body;
    console.log(req.body)
    let userId = "";
  
    if(req.session.userId){
      userId = req.session.userId;
    }else{
      console.error('Error creating plan');
      res.status(500).json({ error: 'Failed to get plans' });
      return
    } 

    const user = await db.user.findOne({id: +userId});

    if(user == null) {
      console.error('Error creating plan');
      res.status(500).json({ error: 'Error creating plan' });
      return
    }else{
      try {
        const plan = db.workoutPlan.create({ name: name,  user: user });
        if(sessions) {
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
        }
        
        await db.em.persistAndFlush(plan);
        res.status(200).json({ plan: plan});
        return
      } catch (error) {
          console.error('Error creating plan:', error);
          res.status(500).json({ error: 'Error creating plan' });
          return
      }
    }
  });
  
  router.post("/add-sessions", async (req, res) => {
    const { sessions, plan_id } = req.body;
    const errorMsg = 'Error adding sessions to plan'
    let userId = "";
    console.log(sessions);
    console.log(plan_id)
    if(req.session.userId){
      userId = req.session.userId;
    }else{
      res.status(500).json({ error: errorMsg });
    } 

    const user = await db.user.findOne({id: +userId},{ populate: ['plans.sessions']});

    if(user == null) {
      console.error(errorMsg);
      res.status(500).json({ error: errorMsg });
    }else{
      try {
        const plan = user.plans.find((plan: { id: any; }) => {return plan.id == plan_id})
        if(plan == null) {
            console.error(errorMsg);
            res.status(500).json({ error: errorMsg });
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
          res.status(500).json({ error: errorMsg });
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

  router.post("/update-name", async (req, res) => {
    const { name, id } = req.body;
    const errorMsg = 'Error updating plan name'
    console.log(req.body)
    let userId = "";
  
    if(req.session.userId){
      userId = req.session.userId;
    }else{
      console.error(errorMsg);
      res.status(500).json({ error: errorMsg });
      return
    } 

    const user = await db.user.findOne({id: +userId});

    if(user == null) {
      console.error(errorMsg);
      res.status(500).json({ error: errorMsg });
      return
    }else{
      try {
        const plan = await db.workoutPlan.findOne({id: id});

        if(plan == null) {
          console.error(errorMsg);
          res.status(500).json({ error: errorMsg });
          return
        }
        plan.name = name;
        await db.em.persistAndFlush(plan);
        res.status(200).json({ plan: plan});
        return
      } catch (error) {
          console.error(errorMsg+':', error);
          res.status(500).json({ error: errorMsg });
          return
      }
    }
  });

  router.get("/get", async (req, res) => {
    const errorMsg = 'Error getting plan'
    console.log(req.body)
    let userId = "";
  
    if(req.session.userId){
      userId = req.session.userId;
    }else{
      console.error(errorMsg);
      res.status(500).json({ error: errorMsg });
      return
    } 

    let plan_id;
    if(req.query.id){
      plan_id = req.query.id;
    }else{
      console.error(errorMsg);
      res.status(500).json({ error: errorMsg });
      return
    } 

    let sessionType="";
    if(req.query.session){
      sessionType = req.query.session +"";
    }else{
      console.error(errorMsg);
      res.status(500).json({ error: errorMsg });
      return
    }

    
    let day = "";
    if(req.query.day){
      day = req.query.day+"";
    }else{
      console.error(errorMsg);
      res.status(500).json({ error: errorMsg });
      return
    }

    const user = await db.user.findOne({id: +userId});

    if(user == null) {
      console.error(errorMsg);
      res.status(500).json({ error: errorMsg });
      return
    }else{
      try {
        const plan = await db.workoutPlan.findOne({id: +plan_id}, { populate: ['sessions','sessions.sets']});
        if(plan == null) {
          console.error(errorMsg);
          res.status(500).json({ error: errorMsg });
          return
        }
        const session = await db.workoutSession.findOne({plan:plan, workout_type: sessionType, day_of_week: day}, 
          { populate: ['plan.name','sets','sets.exercise.*', 'sets.set_number', 'sets.target_reps', 'sets.target_weight']});
        if(session == null) {
          console.error(errorMsg);
          res.status(500).json({ error: errorMsg });
          return
        }

        const exercises = new Map<string, object[]>()

        session.sets.map((set: SessionSet) => {
          console.log(set.exercise.name)
          if(exercises.has(set.exercise.name)){
            
            const current = exercises.get(set.exercise.name);

            if(current){
              current?.push({reps: set.target_reps, weight: set.target_weight, completed: false})
              console.log(current)
              exercises.set(set.exercise.name, current)
            }

          }else{
            const current = new Array();
            current.push({reps: set.target_reps, weight: set.target_weight, completed: false});
            console.log(current)
            exercises.set(set.exercise.name, current)
          }
        })

        const exerciseArray = [...exercises].map(([name, sets]) => ({ name, sets }));

        res.status(200).json({ session: session, exercises: exerciseArray});
        return
      } catch (error) {
          console.error(errorMsg+':', error);
          res.status(500).json({ error: errorMsg });
          return
      }
    }
  });

  router.get("/get-plan", async (req, res) => {
    const errorMsg = 'Error getting plan'
    console.log(req.body)
    let userId = "";
  
    if(req.session.userId){
      userId = req.session.userId;
    }else{
      console.error(errorMsg);
      res.status(500).json({ error: errorMsg });
      return
    } 

    let plan_id;
    if(req.query.id){
      plan_id = req.query.id;
    }else{
      console.error(errorMsg);
      res.status(500).json({ error: errorMsg });
      return
    } 

    const user = await db.user.findOne({id: +userId});

    if(user == null) {
      console.error(errorMsg);
      res.status(500).json({ error: errorMsg });
      return
    }else{
      try {
        const plan = await db.workoutPlan.findOne({id: +plan_id}, { populate: ['sessions','sessions.sets']});
        if(plan == null) {
          console.error(errorMsg);
          res.status(500).json({ error: errorMsg });
          return
        }

        res.status(200).json({ plan: plan});
        return
      } catch (error) {
          console.error(errorMsg+':', error);
          res.status(500).json({ error: errorMsg });
          return
      }
    }
  });

  return router;
}