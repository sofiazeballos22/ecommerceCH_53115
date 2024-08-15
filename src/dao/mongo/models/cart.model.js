import mongoose from 'mongoose';

const cartShema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: { type: Number, default: 1 }
        }
    ]
});

export default mongoose.model('Cart', cartShema);