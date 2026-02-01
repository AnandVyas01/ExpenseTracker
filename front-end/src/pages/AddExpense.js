import ExpenseForm from "../components/ExpenseForm";

export default function AddExpense({ onExpenseAdded }) {
  return (
    <div>
      <h2>Add Expense</h2>
      <ExpenseForm onExpenseAdded={onExpenseAdded} />
    </div>
  );
}
