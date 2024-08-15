import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productShema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    price: { type: String, required: true },
    status: { type: Boolean, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    thumbnails: [String],
    owner: { type: String, default: 'admin' }
});
productShema.plugin(mongoosePaginate);

export default mongoose.model('Product', productShema);


