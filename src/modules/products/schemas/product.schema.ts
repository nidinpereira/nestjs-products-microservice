import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  barcode: Number,
  brand: String,
  description: String,
  available: Boolean,
  createdAt: String,
  updatedAt: String,
});
