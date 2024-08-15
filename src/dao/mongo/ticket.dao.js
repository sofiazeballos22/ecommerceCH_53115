import Ticket from './models/ticket.model.js';

class TicketDAO  {
    async createTicket(ticketData) {
        return await Ticket.create(ticketData);
    }

    async getTicketById(ticketId) {
        try {
            const ticket = await Ticket.findById(ticketId);

            if (!ticket) {
                return null;
            }
            return ticket;
        } catch (error) {
            console.error('Error en el DAO al obtener el ticket', error.message );
            throw new Error('Error al buscar el ticket')
        }
    }
}

export default new TicketDAO();