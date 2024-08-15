class CartDTO {
    constructor({ _id, user, products }) {
        this.id = _id.toString();
        this.user = user.toString();
        this.products = products.map(product => ({
           product: {
                id: product.product._id.toString(), 
                title: product.product.title,
                price: product.product.price,
                stock: product.product.stock,
            },
            quantity: product.quantity
        }));
    }
}

export default CartDTO;