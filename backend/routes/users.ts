import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import { User } from '../models/User.model';
import { LoginCredential } from '../models/LoginCredential.model';

const router = express.Router();

router.post("/signup", async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const user = await LoginCredential.findOne({ where: { email } });

    // If the user exists
    if (user != null) {
      return res.status(400).json({ error: 'An account with that email already exists' });
    }

    // Create the user
    const newUser: User = await User.create({ username });

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the login credentials
    await LoginCredential.create({
      userId: newUser.id,
      email,
      password: hashedPassword
    });

    res.status(200).json({ user: newUser});
  } catch (error) {
    console.error('Error creating user and credentials:', error);
    res.status(500).json({ error: 'Failed to signup user' });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const errorMsg = 'Invalid email or password';

  try {

    // Find the corresponding credentials
    const credentials = await LoginCredential.findOne({
      where: {
        email 
      },
      include: User
    });

    // If the credentials don't exist
    if (!credentials) {
      return res.status(400).json({ error: errorMsg });
    }
    credentials.get
    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, credentials.password);

    if (!passwordMatch) {
      return res.status(400).json({ error: errorMsg });
    }

    // Passwords match, user is authenticated
    res.json({ message: 'Login successful'});
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// router.get('/get/:id', async (req: Request, res: Response) => {
//   const userId = req.params.id;
//   try {
//     const user = await User.findByPk(userId); 
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     res.json(user);
//   } catch (error) {
//     console.error('Error retrieving user:', error);
//     res.status(500).json({ error: 'Failed to retrieve user' });
//   }
// });

export default router;