
import ProductService from '../services/product.service.js';

  export const getAllProducts = async (req, res) => {
    try {
      const products = await ProductService.getProducts(req.query);
      if (!products || products.payload.length === 0) {
        return res.status(404).json({ error: 'No products found' });
      }
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch products', details: error.message });
    }
  };

 
  export const getProductById = async (req, res) => {
    try {
      const product = await ProductService.getProductById(req.params.pid);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch product', details: error.message });
    }
  };
  

    export const createProduct = async (req, res) => {

    try {
      const productData = {
        ...req.body,
        owner: req.user.role === 'premium' ? req.user.email : 'admin'
      };
  
      const product = await ProductService.createProduct(productData);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create product', details: error.message });
    }
  };
  


  export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const product = await ProductService.getProductById(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        if (req.user.role === 'premium' && product.owner !== req.user.email) {
            return res.status(403).json({ error: 'You can only update your own products' });
        }

        const updatedProduct = await ProductService.updateProduct(id, updates);
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update product', details: error.message });
    }
};


export const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const result = await ProductService.deleteProduct(pid, req.user);
    res.json(result);
  } catch (error) {
    if (error.message === 'Product not found') {
      return res.status(404).json({ error: error.message });
    }
    if (error.message === 'You can only delete your own products') {
      return res.status(403).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to delete product', details: error.message });
  }
};