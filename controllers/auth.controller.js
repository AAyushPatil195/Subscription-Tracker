import mongoose from 'mongoose'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_EXPIRES_IN, JWT_SECRET } from '../config/env';
import User from '../models/user.model';


export const signUp = async (req, res, next) => {
    //Implement sign up logic here
    const session = await mongoose.startSession();
    session.startTransaction(); //Atomic transaction starts here
    try{
        //Logic to create a new user
        const { name, email, password } = req.body;

        //check if user already exists
        const existingUser = await User.findOne({ email });

        if(existingUser){
            const error = new Error('User already exists');
            error.statusCode = 409;
            throw error;
        }

        //Hash the password (hide pswrd)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUsers = await User.create([{name, email, password: hashedPassword}], { session });
        // const newUsers = await user.create([{name, email, password: hashedPassword}], { session });

        const token = jwt.sign({userID: newUsers[0]._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

        await session.commitTransaction();
        session.endSession();

        res.status(201).json([{
            success: true,
            message: 'User created successfully',
            data: {
                token,
                user: newUsers[0],
            }
        }])

    }catch(error){
        //Rollback transaction in case of error
        await session.abortTransaction();
        session.endSession();
        next(error); //Pass the error to the error middleware
    }
    
}

// export const signIn = async (req, res, next) => {
//     //Implement sign in logic here
// }

// export const signOut = async (req, res, next) => {
//     //Implement sign out logic here
// }