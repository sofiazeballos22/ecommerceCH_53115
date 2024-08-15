
import express from 'express';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/current', authenticate, (req, res) => {
  res.json(req.user);
});


export default router;
