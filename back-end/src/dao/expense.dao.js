import Expense from "../models/expense.model.js";

export const createExpense = (data) => {
  return Expense.create(data);
};

export const findByExpenseId = (expenseId) => {
  return Expense.findOne({ expenseId });
};

export const getExpenses = (filters, sort) => {
  return Expense.find(filters).sort(sort);
};
