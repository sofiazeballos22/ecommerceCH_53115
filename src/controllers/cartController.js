import CartService from '../services/cart.service.js';



const purchaseCart = async (req, res) => {
    try {
      // Log inicial con el ID del usuario y el correo
      const userId = req.user.id;
      const userEmail = req.user.email; 
      const cartId = req.params.cid;
  
      
      // Intentar realizar la compra
      const { ticket, errors } = await CartService.purchaseCart(cartId, userId, userEmail);
  
      // Verificación y transformación del ticket para la respuesta
      if (ticket) {
        const plainTicket = {
          code: ticket.code,
          purchase_datetime: ticket.purchase_datetime,
          amount: ticket.amount,
          purchaser: ticket.purchaser,
          id: ticket._id 
        };
  
  
        return res.json({ ticket: plainTicket, errors });
      } else {
        console.error('No se pudo generar el ticket');
        return res.status(400).json({ error: 'No se pudo generar el ticket.' });
      }
    } catch (error) {
      console.error('Error durante el proceso de compra:', error.message);
  
      if (error.message === 'No se puede completar la compra con un carrito vacío') {
        console.warn('El carrito está vacío:', error.message);
        return res.status(400).json({ error: error.message });
      } else {
        console.error('Error inesperado al completar la compra:', error);
        return res.status(500).json({ error: 'Failed to complete purchase', details: error.message });
      }
    }
  };
  
const getCartById = async (req, res) => {
    try {
        const cart = await CartService.getCartById(req.params.cid); 
        if (!cart) {
            return res.status(404).json({ error: 'El carrito no funciona'});
        }

        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch cart', details: error.message });
    }   
};

const createCart = async (req, res) => {
    try {
        const newCart = await CartService.createCart(req.user.id);
        if (!newCart) {
            return res.status(400).json({ error: 'Failed al crearse el carrito' });
        } 
        res.status(201).json(newCart);
        } catch (error) {
            res.status(201).json({ error: 'Fallo al crear el carrito', details: error.message });
    }
    
 };


        

 const getCartByUser = async (req, res) => {
    try {

        const userId = req.user.id;

        let cart = await CartService.getCartByUserId(userId);
        if (!cart) {

            // Aquí puedes decidir si crear un carrito automáticamente para el usuario
            cart = await CartService.createCart(userId);
        }
            if (!cart) {
                return res.status(500).json({ error: 'Failed to create cart' });
            }

        res.json(cart);
    } catch (error) {
        console.error("Error al obtener el carrito del usuario:", error.message);
        res.status(500).json({ error: 'Failed to fetch cart', details: error.message });
    }
};

const addProductToCart = async (req, res) => {
    try {
        const userId = req.user.id; 
        const productId = req.params.pid;
    
        let cart = await CartService.getCartByUserId(userId);
    
        if (!cart) {
            
            cart = await CartService.createCart(userId);
            
            if (!cart) {
    
                return res.status(500).json({ error: 'No se pudo agregar al carrito'});
            }

        }  

        const updatedCart = await CartService.addProductToCart(cart.id, productId);
        if (!updatedCart) {
            return res.status(404).json({ error: 'El carrito y el producto no responden' });
        }  
            
        res.json(updatedCart);
        } catch (error) { 
            res.status(500).json({ error: 'Fallo al agregar el producto al carrito', details: error.message });
        }
    };
   

  
const updateCart = async(req, res) => {
    try{
        const updatedCart = await CartService.updateCart(req.params.cid, req.body.products);
        if(!updatedCart) {
            return res.status(404).json({ error: 'El carrito no funciona' });
        }
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ error: 'Fallo al actualizar el carrito', details: error.message });
    };
};

const updateProductQuantity = async (req, res) => {
    try {
      const updatedCart = await CartService.updateProductQuantity(req.params.cid, req.params.pid, req.body.quantity);
      if (!updatedCart) {
        return res.status(404).json({ error: 'El carrito y el producto no responden' });
      }
      res.json(updatedCart);
    } catch (error) {
      res.status(500).json({ error: 'Fallo al actualizar al cargar el producto', details: error.message });
    }
  };

  const deleteAllProductsFromCart = async (req, res) => {
    try {
      const updatedCart = await CartService.deleteAllProductsFromCart(req.params.cid);
      if (!updatedCart) {
        return res.status(404).json({ error: 'Cart not found' });
      }
      res.json(updatedCart);
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete all products from cart', details: error.message });
    }
  };

  const deleteProductFromCart = async (req, res) => {
    try {
      const updatedCart = await CartService.deleteProductFromCart(req.params.cid, req.params.pid);
      if (!updatedCart) {
        return res.status(404).json({ error: 'Cart or product not found' });
      }
      res.json(updatedCart);
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete product from cart', details: error.message });
    }
};

        
   
export default {
    getCartByUser,
    purchaseCart,
    createCart,
    getCartById,
    addProductToCart,
    updateCart,
    updateProductQuantity,
    deleteProductFromCart,
    deleteAllProductsFromCart
}