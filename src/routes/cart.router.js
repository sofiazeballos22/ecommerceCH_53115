import { Router } from 'express';
import CartController from '../controllers/cartController.js'; 


const router = Router();
import { authenticate } from '../middleware/auth.js';

//router.post('/', CartController.createCart);
//router.get('/:cid', authenticate,  CartController.getCartById); 
router.post('/:cid/product/:pid', authenticate, CartController.addProductToCart);
router.post('/:cid/purchase',authenticate ,  CartController.purchaseCart);
//router.put('/:cid', CartController.updateCart);
router.put('/:cid/product/:pid', CartController.updateProductQuantity);
router.delete('/:cid/product/:pid',CartController.deleteProductFromCart);
router.delete('/:cid', CartController.deleteAllProductsFromCart);

router.post('/add/:pid', authenticate, CartController.addProductToCart);


router.get('/user-cart', authenticate, CartController.getCartByUser);

export default router;
