const CartDAO = require ('../dao/mongo/cart.dao');

class CartService {
    async createCart() {
        const cart = await CartDAO.createCart();
        return new CartDTO(cart);
    }

    async getCartById(id) {
        const cart = await CartDAO.getCartById(id);
        return new CartDTO(cart);
    }

    async addProductToCart(cartId, productId) {
        const cart = await CartDAO.addProductToCart(cartId, productId);
        return new CartDAO(cart);
    }
}

module.exports = new CartService();