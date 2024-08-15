
import { Router } from 'express';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import ProductModel from '../dao/mongo/models/product.model.js';
import { authenticate, authorize } from '../middleware/auth.js';
import faker from 'faker';
faker.locale = 'es';  
const router = Router();

router.get('/', getAllProducts);
router.get('/:pid', getProductById);
router.post('/', authenticate, authorize(['Admin', 'premium']), createProduct);
router.put('/:pid', authenticate, authorize(['Admin', 'premium']), updateProduct);
router.delete('/:pid', authenticate, authorize(['Admin', 'premium']), deleteProduct);



export default router;