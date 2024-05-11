import mongoose, { Document, Model, Schema } from 'mongoose';

// Interface defining the Mobile document structure
interface ICart extends Document {
  name: string;
  price: number;
  quantity: number;
}

// Mobile schema definition using the interface
const CartSchema: Schema<ICart> = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
});

// Export the model based on the schema
export const Cart: Model<ICart> = mongoose.model<ICart>('Cart', CartSchema);