
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    user_id: {
        type: Number,
        required: true
    },
    tariff_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Tariff'
    },
    order_id: {
        type: String,
        required: true
    },
    created_at: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    payment_method: {
        type: String,
    },
    expire_bill: {
        type: String,
        required: true
    }
}, { toObject: { virtuals: true } });


transactionSchema.virtual('user', {
    ref: 'User',
    localField: 'user_id',
    foreignField: 'user_id',
    justOne: true // for many-to-1 relationships
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction