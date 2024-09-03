import express, { Router } from 'express';
import { findAllUsers, findUsersByHome } from '../controllers/userController';

const router: Router = express.Router();

// Define routes
router.get('/find-all', findAllUsers);
router.post('/find-by-home/:street_address', findUsersByHome);

export default router;
