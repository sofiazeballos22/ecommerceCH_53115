const ProductService = require ('../services/product.service');

exports.getAllProducts = async (req, res) => {
    const products = await ProductService.getAllProducts();
    if (!products) return res.status(500).json ({ error: 'Error al buscar los productos'})
        res.json(products);
};

exports.getProductById = async (req, res) => {
    const product = await ProductService.getProductById(req.params.pid);
    if (!product) return res.status(404).json ({ error: 'Producto no encontrado'});
    res.json(product);
};

exports.createProduct = async (req, res) => {
    const newProduct = await ProductService.createProduct(req.body);
    if (!newProduct) return res.status(500).json({ error: 'Error al crear el producto' });
    res.json(updatedProduct);
};

exports.deleteProduct = async (req, res) => {
    const deletedProduct = await ProductService.deleteProduct(req.params.pid);
    if (!deletedProduct) return res.status(404).json({ error: 'Producto no encontrado'});
    res.json({ message: 'Producto borrado'})
}