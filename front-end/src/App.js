import { useState } from "react";
import AddExpense from "./pages/AddExpense";
import ExpensesList from "./pages/ExpensesList";
import "./App.css";

function App() {
  const [refresh, setRefresh] = useState(false);
  const handleExpenseAdded = () => setRefresh(prev => !prev);

  return (
    <div>
      <h1>Personal Expense Tracker</h1>
      <AddExpense onExpenseAdded={handleExpenseAdded} />
      <ExpensesList refresh={refresh} />
    </div>
  );
}

export default App;
