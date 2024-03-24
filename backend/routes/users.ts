import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import { User } from '../models/User.model';
import { LoginCredential } from '../models/LoginCredential.model';

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await LoginCredential.findOne({ where: { email } });

    // If the user exists
    if (user != null) {
      return res.status(400).json({ error: 'An account with that email already exists' });
    }

    // Create the user
    const newUser = await User.create({ username });

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the login credentials
    await LoginCredential.create({
      userId: newUser.id,
      email,
      password: hashedPassword
    });

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

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, credentials.password);

    if (!passwordMatch) {
      return res.status(400).json({ error: errorMsg });
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
    // TODO: redirect here
  } catch (error) {
    console.error('Error during logout user:', error);
    res.status(500).json({ error: 'Failed to logout user' });
  }
});

export default router;