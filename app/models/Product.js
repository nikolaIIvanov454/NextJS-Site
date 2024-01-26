import { Int32, ObjectId } from 'mongodb';
import { Schema, model, models } from 'mongoose';

const productSchema = new Schema({
    _id: ObjectId,
    id: Int32,  
    name: String,
    price: String,
    imageUrl: Array,
    type: String,
    description: String
});

const Product = models.Product || model('Product', productSchema);

export default Product;