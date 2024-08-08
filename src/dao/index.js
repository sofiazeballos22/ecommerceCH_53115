const ProductDAO = require ('./mongo/product.dao');
const CarTDAO = require ('./mongo/cart.dao');
const UserDAO = require('./mongo/user.dao')

module.exports ={
    Product: ProductDAO,
    Cart: CarTDAO,
    User: UserDAO,
};