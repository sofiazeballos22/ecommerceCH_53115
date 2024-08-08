const ProductModel = require('./models/product.model');

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
        return await ProductModel.findByIdDelete(id);
    }
}