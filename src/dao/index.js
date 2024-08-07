const ProductDAO = require ('./mongo/product.dao');
const CarTDAO = require ('./mongo/cart.dao');

module.exports ={
    Product: ProductDAO,
    Cart: CarTDAO,
};