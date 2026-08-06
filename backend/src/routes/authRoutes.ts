import express from 'express';
import { Signup } from '../controllers/authController';

const authRouter = express.Router()

authRouter.post('/signup', Signup )

export default authRouter
