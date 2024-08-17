import TicketService from '../services/ticket.service.js';
import { sendTicketEmail } from '../services/email.service.js';

const createTicket = async (req, res) => {
  try {
    const ticketData = req.body;
    const newTicket = await TicketService.createTicket(ticketData);
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create ticket', details: error.message });
  }
};

const getTicketById = async (req, res) => {
  try {
    
    const ticketId = req.params.tid;

    const userEmail = req.user.email;

    const ticket = await TicketService.getTicketById(ticketId);

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    // Convertir el ticket a un objeto plano para enviar al frontend
    const plainTicket = {
      code: ticket.code,
      purchase_datetime: ticket.purchase_datetime,
      amount: ticket.amount,
      purchaser: ticket.purchaser,
      id: ticket._id.toString() // Convertir ObjectId a string
    };

    // Enviar el correo con los detalles del ticket
    await sendTicketEmail(userEmail, plainTicket);


    // En lugar de renderizar la vista, enviamos el ticket como JSON
    res.json({ ticket: plainTicket });
  } catch (error) {
    console.error('Error al obtener el ticket en el controlador:', error.message);
    res.status(500).json({ error: 'Failed to fetch ticket', details: error.message });
  }
};

export default {
  getTicketById,
  createTicket,
};
