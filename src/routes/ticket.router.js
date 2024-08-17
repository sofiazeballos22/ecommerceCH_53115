
import { Router } from 'express';
import TicketController from '../controllers/ticket.controller.js';
import { authenticate, authorize } from '../middleware/auth.js'; // Asegúrate de usar el middleware de autenticación

const router = Router();

router.get('/:tid', authenticate, TicketController.getTicketById);


export default router;


