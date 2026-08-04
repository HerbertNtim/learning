import express from 'express';

const authRouter = express.Router()

authRouter.get('/login', (req, res) => {
  res.send("Welcome to Vibe chat application")
})

export default authRouter
