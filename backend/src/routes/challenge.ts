import express, { Request, Response, Router } from 'express';
import { User } from '../entities/user.entity.js';
import { initORM } from '../db.js';
import { SessionSet } from '../entities/set.entity.js';
import { WorkoutSession } from '../entities/workout-session.entity.js';
import { Challenge } from '../entities/challenge.entity.js';
import { ChallengeSet } from '../entities/challenge-set.entity.js';

export async function registerChallengeRoutes(router: Router): Promise<express.Router> {

  const db = await initORM();

  router.get("/get-all", async (req, res) => {
    let userId = "";
    const errorMsg = 'Error getting challenges';

    if(req.query.id){
      userId = (req.query.id).toString();
    }else if(req.session.userId){
      userId = req.session.userId;
    }else{
      res.status(500).json({ error: errorMsg });
    }
    const user = await db.user.findOne({id: +userId},{ populate: ['challenges.sets.exercise', 'participating_challenges.sets.exercise']});
  
    if(user == null) {
      console.error(errorMsg);
      res.status(500).json({ error: errorMsg });
    }else{
      try {

        const challenges: any[] = user.challenges.getItems().concat(user.participating_challenges.getItems())
        const formattedChallenges = new Map()
        for(const challenge of challenges) {

          const exercises = new Map<string, object[]>()

          challenge.sets.map((set: ChallengeSet) => {
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
              current.push({id: set.set_number, reps: set.target_reps, weight: set.target_weight, completed: false});
              console.log(current)
              exercises.set(set.exercise.name, current)
            }
          })

          const exerciseArray = [...exercises].map(([name, sets]) => ({ name, sets }));
          challenge.exercises = exerciseArray;
          formattedChallenges.set(challenge.id, exerciseArray);
        }
        console.log(challenges);
        console.log(formattedChallenges);
        const exerciseArray = [...formattedChallenges].map(([id, exercises]) => ({ id, exercises }));
        res.status(200).json({challenges: challenges, exercises: exerciseArray});
      } catch (error) {
          console.error(errorMsg + ':', error);
          res.status(500).json({ error: errorMsg});
      }
    }
  });

  router.post("/create", async (req, res) => {
    const { users, sets, name} = req.body;
    const errorMsg = 'Error adding sessions to plan'
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

        const newSets = await Promise.all<ChallengeSet>(sets.map(
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
                  return new ChallengeSet(set.set_number, exercise, set.target_weight, set.target_reps)
              }
      }))

        const challenge = new Challenge(newSets, name, user)
        user.challenges.add(challenge);

        for (const curUserId of users) {
          const curUser = await db.user.findOne({id: +curUserId});
          if(curUser == null){
            continue
          }

          curUser.participating_challenges.add(challenge)
          await db.em.persistAndFlush(curUser);
        }
        await db.em.persistAndFlush(user);
        res.status(200).json({ challenge: challenge});
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