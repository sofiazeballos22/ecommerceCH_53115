const CartModel = require("./models/cart.model");

class CartDAO {
    async createCart () {
        return await CartModel.create({});
    }

    async getCartById(id) {
        return await CartModel.findById(id).populate('products.product')
    }

    async addProductToCart(cartId, productId) { 
        const cart = await CartModel.findById(cartId);
        if (!cart) return null;

        const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
        if (productIndex > -1) {
            cart.products[productIndex].quantity += 1;
        } else {
            cart.product.push({ product: productId, quantity: 1 });
        }

        await cart.save();
        return cart;
    }
}

module.exports = new CartDAO();

