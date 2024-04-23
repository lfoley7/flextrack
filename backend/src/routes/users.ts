import express, { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt'
import { User } from '../entities/user.entity.js';
import { LoginCredential } from '../entities/login-credential.entity.js';
import { initORM } from '../db.js';

export async function registerUserRoutes(router: Router): Promise<express.Router> {

  const db = await initORM();

  router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
      
      const userCount = await db.em.count(LoginCredential, { email: email });

      // If the user exists
      if (userCount > 0) {
        res.status(400).json({ error: 'An account with that email already exists' });
        return
      }

      // Create the user
      const loginCredentials = await LoginCredential.create(email, password);
      const newUser = new User(username, loginCredentials);

      await db.em.persistAndFlush(loginCredentials);
      await db.em.persistAndFlush(newUser);

      //Set userId session cookie
      req.session.userId = newUser.id.toString();

      res.status(200).json({ user: newUser});
    } catch (error) {
      console.error('Error creating user and credentials:', error);
      res.status(500).json({ error: 'Failed to signup user' });
    }
  });

  router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const errorMsg = 'Invalid email or password';

    try {
      // Find the corresponding credentials
      const credentials = await db.em.findOne(LoginCredential, { email: email });
      
      // If the credentials don't exist
      if (!credentials) {
        res.status(400).json({ error: errorMsg });
        return 
      }

      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, credentials.password);

      if (!passwordMatch) {
        res.status(400).json({ error: errorMsg });
        return 
      }

      // Passwords match, user is authenticated
      // Set session variable
      req.session.userId = credentials.user.id.toString();
      res.json({ message: 'Login successful'});
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Login failed' });
    }
  });

  router.get('/logout', async (req: Request, res: Response) => {
    try {
      req.session.destroy(() => {});
    } catch (error) {
      console.error('Error during logout user:', error);
      res.status(500).json({ error: 'Failed to logout user' });
    }
  });

  router.post("/add-friend", async (req, res) => {
    let userId = "";
    const errorMsg = 'Failed to add friend'
    const friendId = req.body.id;

    if(req.query.id){
      userId = (req.query.id).toString();
    }else if(req.session.userId){
      userId = req.session.userId;
    }else{
      res.status(500).json({ error: errorMsg });
    }
    const user: User = await db.user.findOne({id: +userId},{ populate: ['friends']});
    if(user == null) {
      console.error(errorMsg);
      res.status(500).json({ error: errorMsg });
    }else{
      try {
        console.log(friendId);
        const friend: User = await db.user.findOne({id: friendId});
        user.friends.add(friend)

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