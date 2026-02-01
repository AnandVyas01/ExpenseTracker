import { useState } from "react";
import { createExpense } from "../services/expenseService";
import { v4 as uuidv4 } from "uuid";

export default function ExpenseForm({ onExpenseAdded }) {
  const [form, setForm] = useState({ amount: "", category: "", description: "", date: "" });
  const [expenseId, setExpenseId] = useState(uuidv4());
  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const errs = {};
    if (!form.amount || isNaN(form.amount) || parseFloat(form.amount) <= 0)
      errs.amount = "Amount must be a positive number";
    if (!form.category || form.category.trim() === "")
      errs.category = "Category is required";
    if (!form.date || isNaN(Date.parse(form.date)))
      errs.date = "Date is required";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    setLoading(true);
    if (Object.keys(errs).length > 0) return;

    try {
      await createExpense({ ...form, expenseId });
      setForm({ amount: "", category: "", description: "", date: "" });
      setExpenseId(uuidv4());
      setErrors({});
      onExpenseAdded();
    } catch (err) {
      console.error(err);
      alert("Error adding expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input type="number" name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} />
        {errors.amount && <div style={{ color: "red" }}>{errors.amount}</div>}
      </div>

      <div>
        <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} />
        {errors.category && <div style={{ color: "red" }}>{errors.category}</div>}
      </div>

      <div>
        <input type="text" name="description" placeholder="Description (optional)" value={form.description} onChange={handleChange} />
      </div>

      <div>
        <input type="date" name="date" value={form.date} onChange={handleChange} />
        {errors.date && <div style={{ color: "red" }}>{errors.date}</div>}
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Add Expense"}
      </button>
    </form>
  );
}
