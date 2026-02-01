export const toExpenseDTO = (body) => ({
  expenseId: body.expenseId,
  amount: body.amount,
  category: body.category,
  description: body.description,
  date: new Date(body.date)
});
