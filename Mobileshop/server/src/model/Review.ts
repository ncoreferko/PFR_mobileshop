import mongoose, { Document, Model, Schema } from 'mongoose';

// Interface defining the Mobile document structure
interface IReview extends Document {
  review: string;
  modelName: string;
  name: string;
  date: Date;
}

// Mobile schema definition using the interface
const ReviewSchema: Schema<IReview> = new mongoose.Schema({
    review: { type: String, required: true },
  modelName: { type: String, required: true },
  name: { type: String },
  date: { type: Date, required: true }
});

// Export the model based on the schema
export const Review : Model <IReview> = mongoose.model<IReview>('Review ', ReviewSchema);