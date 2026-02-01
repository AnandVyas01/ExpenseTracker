import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    expenseId: {
      type: String,
      required: true,
      unique: true
    },

    amount: {
      type: mongoose.Types.Decimal128,
      required: true
    },

    category: {
      type: String,
      required: true,
      index: true
    },

    description: {
      type: String,
      default: ""
    },

    date: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: false }
  }
);

export default mongoose.model("Expense", expenseSchema);
