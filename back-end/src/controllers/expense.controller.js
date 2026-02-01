import * as expenseService from "../services/expense.service.js";
import { toExpenseDTO } from "../dto/expense.dto.js";

export const createExpense = async (req, res) => {
  try {
    const { expenseId, amount, category, description, date } = req.body;

    if (!expenseId) return res.status(400).json({ error: "Missing expenseId" });
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) 
      return res.status(400).json({ error: "Amount must be a positive number" });
    if (!category || typeof category !== "string" || category.trim() === "")
      return res.status(400).json({ error: "Category is required" });
    if (!date || isNaN(Date.parse(date)))
      return res.status(400).json({ error: "Date is required and must be valid" });

    const existing = await expenseService.findOne({ expenseId });
    if (existing) return res.status(200).json(existing);

    const expense = await expenseService.addExpense({ expenseId, amount, category, description, date });
    res.status(201).json(toExpenseDTO(expense));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};


export const getExpenses = async (req, res) => {
  const { category, sort } = req.query;

  const expenses = await expenseService.listExpenses({
    category,
    sort
  });

  res.json(expenses.map(toExpenseDTO));
};
