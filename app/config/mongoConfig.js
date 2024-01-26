import mongoose from 'mongoose';

const connect = async () => mongoose.connect(process.env.MONGO_URI);

export default connect;