import express, { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
import {
  findHomeByUser,
  updateUsersForHome
} from '../controllers/homeController';

const router: Router = express.Router();

router.get('/find-by-user/:username', findHomeByUser);

router.post('/update-users/:street_address',updateUsersForHome);

export default router;
