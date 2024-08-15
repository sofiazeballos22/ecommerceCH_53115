const { Router } = require('express');
const CartController = require('../controllers/cartController');

const router = Router();

router.post('/', CartController.createCart);
router.get('/:cid', CartController.getCartById);
router.post('/:cid/product/:pid', CartController.addProductToCart);
//router.post('/:cid/purchase', CartController.purchaseCart);

module.exports = router;