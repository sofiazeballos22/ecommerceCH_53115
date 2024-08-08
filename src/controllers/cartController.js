const CartService = require('../services/cart.service');

exports.createCart = async (req, res) => {
    try {
    const newCart = await CartService.createCart();
    if (!newCart) {
        return res.status(400).json({ error: 'Falla en la creación de carrito'});
    }
    res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ error: 'Falla en la creación de carrito', details: error.message });
    }
};

exports.getCartById = async (req, res) => {
    try {
    const cart = await CartService.getCartById(req.params.cid);
    if (!cart) {
        return res.status(404).json({ error: 'El carrito no funciona'});
    }
    res.json(cart);
    } catch (error) {
        res.status(500).json({ error: details.error})
    }
};

exports.addProductToCart = async (req, res) => {
    const updatedCart = await CartService.addProductToCart(req.params.cid, req.params.pid);
    if (!updatedCart) return res.status(500).json({ error: 'No se pudo agregar al carrito'});
    res.json(updatedCart);
}