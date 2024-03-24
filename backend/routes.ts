import express from 'express';
import users from "./routes/users"
import exercises from "./routes/exercises"

const router = express.Router();

router.use("/user",users);
router.use("/exercise",exercises);

export default router;