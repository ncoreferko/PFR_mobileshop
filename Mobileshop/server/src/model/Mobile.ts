import mongoose, { Document, Model, Schema } from 'mongoose';

// Interface defining the Mobile document structure
interface IMobile extends Document {
  brand: string;
  modelName: string;
  price: number;
  inStock: number;
}

// Mobile schema definition using the interface
const MobileSchema: Schema<IMobile> = new mongoose.Schema({
  brand: { type: String, required: true },
  modelName: { type: String, required: true },
  price: { type: Number, required: true },
  inStock: { type: Number, required: true }
});

// Export the model based on the schema
export const Mobile: Model<IMobile> = mongoose.model<IMobile>('Mobile', MobileSchema);
