
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const languages = {
    values: ['ru', 'en'],
    message: 'Status must be either of \'en\', \'ru\''
}

const userSchema = new Schema({
    user_id: {
        type: Number,
        unique: true,
        required: true,
        // dropDups: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    created_at: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        enum: languages,
        required: true,
        default: 'ru'
    },
});

const User = mongoose.model('User', userSchema);
export default User