import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrderItem {
  productId: number;
  slug: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  selectedVariants?: Record<string, string>;
  customBusinessName?: string;
  customReviewLink?: string;
}

export interface ICustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province?: string;
  postalCode?: string;
}

export interface IOrder extends Document {
  orderNumber: string;
  user?: mongoose.Types.ObjectId | null;
  customer: ICustomerInfo;
  items: IOrderItem[];
  paymentMethod: "cod" | "bank_transfer" | "easypaisa_jazzcash";
  paymentStatus: "pending" | "paid" | "verified";
  orderStatus: "placed" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
  subtotal: number;
  shippingFee: number;
  discount: number;
  discountCode?: string;
  total: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    productId: { type: Number, required: true },
    slug: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    image: { type: String, required: true },
    selectedVariants: { type: Map, of: String },
    customBusinessName: { type: String },
    customReviewLink: { type: String },
  },
  { _id: false }
);

const CustomerInfoSchema = new Schema<ICustomerInfo>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    province: { type: String, default: "Punjab" },
    postalCode: { type: String },
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    customer: {
      type: CustomerInfoSchema,
      required: true,
    },
    items: {
      type: [OrderItemSchema],
      required: true,
      validate: [(val: IOrderItem[]) => val.length > 0, "Order must have at least one item."],
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "bank_transfer", "easypaisa_jazzcash"],
      default: "cod",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "verified"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      enum: ["placed", "confirmed", "processing", "shipped", "delivered", "cancelled"],
      default: "placed",
    },
    subtotal: { type: Number, required: true },
    shippingFee: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    discountCode: { type: String, trim: true },
    total: { type: Number, required: true },
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

// Generate human-friendly random order number helper (e.g. TS-84192)
export function generateOrderNumber(): string {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `TS-${randomNum}`;
}

const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
