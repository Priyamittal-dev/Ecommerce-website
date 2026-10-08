import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      required: false,
    },
    stock: {
      type: Number,
      default: 50,
      min: 0,
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    supplierName: {
      type: String,
      default: "Priyanka's Official Store",
    },
    status: {
      type: String,
      enum: ["approved", "pending", "rejected"],
      default: "approved",
    },
  },
  { timestamps: true, versionKey: false }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
