import mongoose, {Schema} from 'mongoose';

const userSchema = new Schema(
    {
        id: Number,
        email: String,
        password: String,
        role: String,
    }, 
    {
        timestamps: { 
            createdAt: 'created_at', 
            updatedAt: 'updated_at' 
        },
        versionKey: false
    }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;