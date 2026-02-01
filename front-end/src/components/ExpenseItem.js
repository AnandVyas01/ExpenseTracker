export default function ExpenseItem({ expense }) {
  let categoryClass = expense.category ? expense.category.toLowerCase() : "other";

    categoryClass = categoryClass.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "");

  return (
    <li>
      <div>
        <span className={`expense-category ${categoryClass}`}>
          {expense.category || "Other"}
        </span>
        ₹{parseFloat(expense.amount.$numberDecimal).toFixed(2)}
        {expense.description && ` - ${expense.description}`}
      </div>
      <div>{new Date(expense.date).toLocaleDateString()}</div>
    </li>
  );
}
