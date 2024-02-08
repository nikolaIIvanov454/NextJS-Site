import mongoose, {Schema} from 'mongoose';

const userSchema = new Schema(
    {
        id: Number,
        username: String,
        password: String,
        role: String,
    }, 
    {
        timestamps: { 
            createdAt: 'created_at', 
            updatedAt: 'updated_at' 
        },
    }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;