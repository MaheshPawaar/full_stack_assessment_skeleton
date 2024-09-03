import { Request, Response } from 'express';
import { In } from 'typeorm';
import { dataSource } from '../data-source';
import { Home } from '../entities/Home';
import { UserHome } from '../entities/UserHome';

const homeRepository = dataSource.getRepository(Home);
const userHomeRepository = dataSource.getRepository(UserHome);

export const findHomeByUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username } = req.params;

  try {
    // Find all street addresses related to the given username
    const userHomes = await userHomeRepository.find({ where: { username } });

    // Extract street addresses
    const streetAddresses = userHomes.map((uh) => uh.street_address);

    // Find all homes with those street addresses
    const homes = await homeRepository.find({
      where: { street_address: In(streetAddresses) },
    });

    // Send homes as JSON response
    res.json(homes);
  } catch (error) {
    console.error('Error fetching homes by user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateUsersForHome = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { street_address } = req.params;
  const { users }: { users: string[] } = req.body;

  // Decode the street_address parameter
  const decodedStreetAddress = decodeURIComponent(street_address);

  if (!Array.isArray(users)) {
    res.status(400).json({ error: 'Invalid users data' });
    return;
  }

  try {
    // Find the home using the decoded street_address
    const home = await homeRepository.findOneBy({
      street_address: decodedStreetAddress,
    });
    if (!home) {
      res.status(404).json({ error: 'Home not found' });
      return;
    }

    // Find all the current users associated with the home using the decoded street_address
    const currentUsers = await userHomeRepository.find({
      where: { street_address: decodedStreetAddress },
    });

    // Extract the usernames of the current users
    const currentUsernames = currentUsers.map((uh) => uh.username);

    // Determine which users need to be added and which need to be removed
    const usersToAdd = users.filter(
      (username) => !currentUsernames.includes(username)
    );
    const usersToRemove = currentUsernames.filter(
      (username) => !users.includes(username)
    );

    // Remove users no longer associated with the home
    if (usersToRemove.length > 0) {
      await userHomeRepository.delete({
        username: In(usersToRemove),
        street_address: decodedStreetAddress,
      });
    }

    // Add new Users to the home
    if (usersToAdd.length > 0) {
      const newRelations = usersToAdd.map((username) => ({
        username,
        street_address: decodedStreetAddress,
      }));
      await userHomeRepository.save(newRelations);
    }

    res.status(200).json({ message: 'Users updated successfully.' });
  } catch (error) {
    console.error('Error updating users for home', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
