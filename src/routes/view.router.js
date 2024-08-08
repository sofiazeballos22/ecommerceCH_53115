const { Router } = ('express')
const ProductService = require('../services/product.service');
const CartService = require('../services/cart.service');

const router = Router();

router.get('/products', async (req, res) => {
    try {
        const products = await ProductService.getAllProducts(req.query);
        res.render('products',{ products: products.payload });
    } catch (error) {
        res.status(500).json({ error: 'Fallo al buscar el producto', details: error.message });
    }
});

router.get('/products/:pid', async (req,res) => {
    try {
        const product = await ProductService.getProductById(req.params.pid);
        res.render('productDetail', { product });
    } catch (error) {
        res.status(500).json({ error: 'Fallo al encontrar el carrito', details: error.message});
    }
});

router.get('carts/:cid', async (req, res) => {
    try {
        const cart = await CartService.getCartById(req.params.cid);
        res.render('cart', { products: cart.products });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch cart', details: error.message });
    }
});

module.exports = router;