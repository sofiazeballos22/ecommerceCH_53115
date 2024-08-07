const mongoose = require ('mongoose');

const productShema = new mongoose.Shema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    price: { type: String, required: true },
    status: { type: String, required: true },
    stock: { type: String, required: true },
    category: { type: String, required: true },
    thumbnails: [String]
});

module.exports = mongoose.model('Product', productShema);


