import * as expenseDAO from "../dao/expense.dao.js";

export const addExpense = async (expenseDTO) => {
  try {
    return await expenseDAO.createExpense(expenseDTO);
  } catch (error) {
    // Duplicate request (retry-safe)
    if (error.code === 11000) {
      return expenseDAO.findByExpenseId(expenseDTO.expenseId);
    }
    throw error;
  }
};

export const listExpenses = ({ category, sort }) => {
  const filters = {};
  const sortOptions = {};

  if (category) {
    filters.category = category;
  }

  // Default: newest first
  if (sort === "datedesc") {
    sortOptions.created_at = -1;
  } else {
    sortOptions.created_at = -1;
  }

  return expenseDAO.getExpenses(filters, sortOptions);
};
