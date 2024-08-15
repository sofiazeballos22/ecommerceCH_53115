const { Router } = require('express');
const CartController = require('../controllers/cartController');

const router = Router();
import { authenticate } from '../'

router.post('/', CartController.createCart);
router.get('/:cid', authenticate,  CartController.getCartById); 
router.post('/:cid/product/:pid', authenticate, CartController.addProductToCart);
router.post('/:cid/purchase',authenticate ,  CartController.purchaseCart);
router.put('/:cid', CartController.updateCart);
router.put('/:cid/product/:pid', CartController.updateProductQuantity);
router.delete('/:cid/product/:pid',CartController.deleteProductFromCart);
router.delete('/:cid', CartController.deleteAllProductsFromCart);

router.post('/add/:pid', authenticate, CartController.addProductToCart);


module.exports = router;