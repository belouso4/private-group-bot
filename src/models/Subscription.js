
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
    user_id: {
        type: Number,
        required: true,
        unique: true,
        ref: 'User'
    },
    tariff_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    order_id: {
        type: String,
        required: true
    },
    start_date: {
        type: String,
        required: true
    },
    end_date: {
        type: String,
        required: true
    }
}, { toObject: { virtuals: true } });

subscriptionSchema.virtual('user', {
    ref: 'User',
    localField: 'user_id',
    foreignField: 'user_id',
    justOne: true // for many-to-1 relationships
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription