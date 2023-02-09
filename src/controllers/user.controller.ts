import { Request, Response } from 'express';
import AppDataSource from '../database/db.config';
import bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { validate } from 'email-validator';


export async function register(req: Request, res: Response) {
  try {
    const { username, email, password } = req.body;

    // Check if email is valid
    if (!validate(email)) {
      return res.status(400).send({ message: 'Invalid email' });
    }

    // Check if the user already exists
    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOne({ where: [{ email }, { username }] });
    if (existingUser) {
      return res.status(409).send({ message: 'User with this email or username already exists' });
    }

    // Hash password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User();
    user.username = username;
    user.email = email;
    user.password = hashedPassword;

    // Store user in the database
    AppDataSource.getRepository(User).save(user)
    //   const userRepository =AppDataSource;
    //   await userRepository.save(user);

    return res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
    return res.status(500).send({ message: 'Error creating user' });
  }
};