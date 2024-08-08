const { Router } = require('express');
const { createCart, getCartById, addProductToCart } = require ('../controllers/cartController');

const router = Router();

router.post('/',createCart);
router.get('/:cid', getCartById);
router.post('/:cid/product/:pid', addProductToCart);
router.post('/:cid/purchase', CartController.purchaseCart);

module.exports = router;