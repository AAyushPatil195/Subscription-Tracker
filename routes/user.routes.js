import { Router} from "express";

const userRouter = Router();

//GET /users --> get all users
//GET /users/:id --> get user by id

userRouter.get('/', (req, res) => res.send({title: 'GET all users'}) );

userRouter.get('/:id', (req, res) => res.send({title: 'GET user details'}) );

userRouter.post('/', (req, res) => res.send({title: 'CREATE new user'}));

userRouter.put('/', (req, res) => res.send({title: 'UPDATE user'}));

userRouter.delete('/:id', (req, res) => res.send({title: 'DELETE a user'}));

export default userRouter;
