
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const tariffSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        days: Number,
        months: Number,
        years: Number,
    },
    order: {
        type: Number,
        default: 0
    }
});

const Tariff = mongoose.model('Tariff', tariffSchema);

export default Tariff
