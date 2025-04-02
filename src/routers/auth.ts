import express, { Router } from 'express';
const router: Router = express.Router();
import { login } from '../controllers/auth'

router.post('/', login);


export default router;
