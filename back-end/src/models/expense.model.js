import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  expenseId: { type: String, required: true, unique: true },
  amount: { 
    type: mongoose.Schema.Types.Decimal128, 
    required: true,
    validate: {
      validator: v => parseFloat(v) > 0,
      message: "Amount must be positive"
    }
  },
  category: { 
    type: String, 
    required: [true, "Category is required"],
    trim: true,
    minlength: [1, "Category cannot be empty"]
  },
  description: { type: String, default: "" },
  date: { 
    type: Date, 
    required: [true, "Date is required"] 
  },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.model("Expense", expenseSchema);
