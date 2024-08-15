import ProductModel from './models/product.model.js';

class ProductDAO {
    async getProducts(filters, options) {
        const query = ProductModel.find(filters);

        if ( options.sort ) {   
            query.sort(options.sort);
        }

        const products = await ProductModel.paginate(query, options);
        return {
            products: products.docs,
            total: products.totalDocs
        };
    }

    async getProducById(id) {
        return await ProductModel.findById(id);
    }

    async createProduct(id) {
        return await ProductModel.create(product);
    }

    async updateProduct(id, product) {
        return await ProductModel.findByIdUpdate(id, product, { new: true });
    }

    async deleteProduct(id) {
        const product = await ProductModel.findById(id);
        if (!product) {
          throw new Error('Product not found');
        }
        await ProductModel.findByIdAndDelete(id); // Elimina el producto directamente
        return product;
    }
}

export default new ProductDAO();