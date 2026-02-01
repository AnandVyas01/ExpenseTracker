import * as expenseService from "../services/expense.service.js";
import { toExpenseDTO } from "../dto/expense.dto.js";

export const createExpense = async (req, res) => {
  const expense = await expenseService.addExpense(
    toExpenseDTO(req.body)
  );

  res.status(200).json(expense);
};

export const getExpenses = async (req, res) => {
  const { category, sort } = req.query;

  const expenses = await expenseService.listExpenses({
    category,
    sort
  });

  res.json(expenses);
};
