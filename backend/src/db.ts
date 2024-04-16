import { EntityManager, EntityRepository, MikroORM, Options } from '@mikro-orm/sqlite';
import { User } from './entities/user.entity';
import { LoginCredential } from './entities/login-credential.entity';
import { Exercise } from './entities/exercise.entity';
import { WorkoutPlan } from './entities/workout-plan.entity';
import { WorkoutLog } from './entities/workout-log.entity';
import { WorkoutSession } from './entities/workout-session.entity';
import { Challenge } from './entities/challenge.entity';
import { ChallengeLog } from './entities/challenge-log.entity';
import { ChallengeSet } from './entities/challenge-set.entity';
import { ChallengeInvite } from './entities/challenge-invite.entity';
import { FitnessProfile } from './entities/fitness-profile.entity';
import { Post } from './entities/post.entity';
import { PostShare } from './entities/post-share.entity';
import { SessionSet } from './entities/set.entity';

export interface Services {
  orm: MikroORM;
  em: EntityManager;
  loginCredential: EntityRepository<LoginCredential>;
  user: EntityRepository<User>;
  exercise: EntityRepository<Exercise>;
  workoutPlan: EntityRepository<WorkoutPlan>;
  workoutLog: EntityRepository<WorkoutLog>;
  workoutSession: EntityRepository<WorkoutSession>;
  workoutSet: EntityRepository<SessionSet>;
  challenge: EntityRepository<Challenge>;
  challengeLog: EntityRepository<ChallengeLog>;
  challengeSet: EntityRepository<ChallengeSet>;
  challengeInvite: EntityRepository<ChallengeInvite>;
  profile: EntityRepository<FitnessProfile>;
  post: EntityRepository<Post>;
  postShare: EntityRepository<PostShare>;
}

let cache: Services;

export async function initORM(options?: Options): Promise<Services> {
  if (cache) {
    return cache;
  }

  const orm = await MikroORM.init(options);

  // save to cache before returning
  return cache = {
    orm,
    em: orm.em,
    loginCredential: orm.em.getRepository(LoginCredential),
    user: orm.em.getRepository(User),
    exercise: orm.em.getRepository(Exercise),
    workoutPlan: orm.em.getRepository(WorkoutPlan),
    workoutLog: orm.em.getRepository(WorkoutLog),
    workoutSession: orm.em.getRepository(WorkoutSession),
    workoutSet: orm.em.getRepository(SessionSet),
    challenge: orm.em.getRepository(Challenge),
    challengeLog: orm.em.getRepository(ChallengeLog),
    challengeSet: orm.em.getRepository(ChallengeSet),
    challengeInvite: orm.em.getRepository(ChallengeInvite),
    profile: orm.em.getRepository(FitnessProfile),
    post: orm.em.getRepository(Post),
    postShare: orm.em.getRepository(PostShare),
  };
}