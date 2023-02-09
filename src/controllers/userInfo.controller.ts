import { Request, Response } from 'express';
import AppDataSource from '../database/db.config';
import { Repository } from "typeorm";
// import redis from 'redis';
import { User } from '../entities/user.entity';


export default  async function userInfo  (req: Request, res: Response)  {
  const username = req.params.username;

  // Check if the provided username is not empty
  if (!username) {
    return res.status(400).send({ message: 'Username is required' });
  }

  try {

//find the user form database
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { username } });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
   // Omit the password property before sending the response
    const { password, ...rest } = user;
    // console.log(username)
    return res.status(200).send({ user: rest });
  } catch (error) {
    return res.status(500).send({ message: 'Error retrieving user information' });
  }
};