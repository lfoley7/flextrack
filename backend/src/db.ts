import { EntityManager, EntityRepository, MikroORM, Options } from '@mikro-orm/sqlite';
import { User } from './entities/user.entity.js';
import { LoginCredential } from './entities/login-credential.entity.js';

export interface Services {
  orm: MikroORM;
  em: EntityManager;
  loginCredential: EntityRepository<LoginCredential>;
  user: EntityRepository<User>;
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
  };
}