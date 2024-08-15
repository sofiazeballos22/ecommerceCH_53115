const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({ 
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    cart: { type: Schema.Types.ObjectId, ref: 'Cart' },
    refreshTokens: { type: [String], default: [] },
    role: { type: String, default: 'user'},
    last_connection: { type: Date, default: null },
    documents: [
        {
            name: { type: String },
            reference: { type: String },
        },
    ],
    isAdminUpgrade: { type: Boolean, default: false },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
});

export default mongoose.model('User', UserSchema);