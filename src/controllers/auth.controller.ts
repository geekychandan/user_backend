import { Request, Response } from 'express';
import AppDataSource from '../database/db.config';
import bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import generateJWT from '../config/jwt'
import { validationResult } from 'express-validator';


export default async function authUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    // Check if there are any validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ message: errors.array()[0].msg });
    }

    // Retrieve user from the database
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }

    // Verify password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: 'Invalid   password' });
    }

    // here  Generated JWT token for logedin user
    const token = generateJWT({ id: user.id, email: user.email });

    return res.status(200).send({ token });
  } catch (error) {
    return res.status(500).send({ message: 'Error logging in' });
  }
};