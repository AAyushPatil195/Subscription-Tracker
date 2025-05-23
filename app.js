import express from 'express';
import { PORT } from './config/env.js';

import userRouter from "./routes/user.routes.js";
import authRouter from './routes/auth.routes.js'
// import subscriptionRoutes from "./routes/subscription.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';


const app = express();

//Middlewares
app.use(errorMiddleware);
app.use(express.json());  // process the incoming request with JSON payload
app.use(express.urlencoded({ extended: false })); // process the incoming request with URL-encoded payload
app.use(cookieParser()); // parses/reads cookies from the request


// api/v1/auth/sign-up
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/users', userRouter);


app.get('/', (req, res) => {
  res.send('Welcome to the Full Stack Subscription-tracker API HELOOOOO')
});

app.listen(PORT, async ()=>{
    console.log(`Subscription Tracker is running on http://localhost:${PORT}`);

    //Connect to DataBase
    await connectToDatabase()
});

export default app;