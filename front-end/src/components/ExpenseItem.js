export default function ExpenseItem({ expense }) {
  const categoryClass = `category-${expense.category || "Other"}`;

  return (
    <li>
      <div>
        <span className={`expense-category ${categoryClass}`}>
          {expense.category || "Other"}
        </span>
        ${parseFloat(expense.amount.$numberDecimal).toFixed(2)}
        {expense.description && ` - ${expense.description}`}
      </div>
      <div>{new Date(expense.date).toLocaleDateString()}</div>
    </li>
  );
}