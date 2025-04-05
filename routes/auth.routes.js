import { Router } from "express";
import { signUp, signIn, signOut } from "../controllers/auth.controller.js";

const authRouter = Router();

//path: /api/v1/auth/sign-up
authRouter.post('/sign-up', signUp);
authRouter.post('/sign-in', signIn);
authRouter.post('/sign-out', signOut);

// authRouter.post('/sign-up', (req, res) => res.send({title: 'Sign-up'}));
// authRouter.post('/sign-in', (req, res) => res.send({title: 'Sign-in'}));
// authRouter.post('/sign-out', (req, res) => res.send({title: 'Sign-out'}));

export default authRouter;