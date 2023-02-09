import { verifyToken } from "../config/jwt";
import { Request, Response } from 'express';
import AppDataSource from '../database/db.config';
import { User } from '../entities/user.entity';

export default async function update (req: Request, res: Response)  {
    try {
      // const { username, email, password } =  await req.body
      const { authorization } = req.headers;
      if (!authorization) {
        return res.status(401).send({ message: 'You are Unauthorized' });
      }
  
      // Verify the provided JWT token
      const token = authorization.split(' ')[1];
      const decoded = verifyToken(token) as { id: number };
      if (!decoded) {
        return res.status(401).send({ message: 'Unauthorized' });
      }
  
      // Retrieve the user from the database
      const userRepository =  AppDataSource.getRepository(User);
      let user = await userRepository.findOne({ where: { id: decoded.id } });
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
  
      // Update the user information
      Object.assign(user, req.body);
      await userRepository.save(user);
      console.log(req.body)
    //   user = Object.assign(user, req.body);
    //   await userRepository.save(user);
  
      return res.status(200).send({ user });
    } catch (error) {
      return res.status(500).send({ message: 'Error updating user information' });
    }
  }