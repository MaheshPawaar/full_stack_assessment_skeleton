import { Request, Response } from 'express';
import { In } from 'typeorm';
import { User } from '../entities/User';
import { UserHome } from '../entities/UserHome';

const { dataSource } = require('../data-source');

const userRepository = dataSource.getRepository(User);
const userHomeRepository = dataSource.getRepository(UserHome);

export const findAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await userRepository.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const findUsersByHome = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { street_address } = req.params;

  if (typeof street_address !== 'string') {
    res
      .status(400)
      .json({ error: 'Missing or invalid street_address parameter' });
    return; // Ensure to return to avoid further processing
  }

  try {
    // Find all UserHome records related to the given street_address
    const userHomes = await userHomeRepository.find({
      where: { street_address },
    });

    // Extract usernames from UserHome records
    const usernames = userHomes.map((uh: { username: any }) => uh.username);

    // Find users by usernames
    const users = await userRepository.findBy({
      username: In(usernames),
    });

    res.json(users);
  } catch (error) {
    console.error('Error fetching users by home:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
