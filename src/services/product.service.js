const ProductDAO = require ('../dao/mongo/product.dao');
const ProductDTO = require('../dto/product.dto');

class ProductService {
    async getAllProducts() {
        return await ProductDAO.getProducts();
    }

    async getProductById(id) {
        const product = await ProductDAO.getProductById(id);
        return new ProductDTO(product);
    }

    async createProduct(product) {
        const newProduct = await ProductDAO.createProduct(product);
        return new ProductDTO(newProduct);
    }

    async updateProduct(id, product) {
        const updateProduct = await ProductDAO.updateProduct(id, product);
        return new ProductDAO(updateProduct);
    }

    async deleteProduct(id) {
        return await ProductDAO.deleteProduct(id);
    }
}

module.exports = new ProductService();