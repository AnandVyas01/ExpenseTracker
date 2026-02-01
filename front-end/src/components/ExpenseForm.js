import { useState } from "react";
import { createExpense } from "../services/expenseService";
import { v4 as uuidv4 } from "uuid";

export default function ExpenseForm({ onExpenseAdded }) {
  const [form, setForm] = useState({
    amount: "",
    category: "",
    description: "",
    date: ""
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createExpense({ ...form, expenseId: uuidv4() });
      setForm({ amount: "", category: "", description: "", date: "" });
      onExpenseAdded();
    } catch (err) {
      console.error(err);
      alert("Error adding expense");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} required />
      <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
      <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      <input type="date" name="date" value={form.date} onChange={handleChange} required />
      <button type="submit">Add Expense</button>
    </form>
  );
}
