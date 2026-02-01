export default function TotalAmount({ expenses }) {
  const total = expenses.reduce((sum, e) => sum + parseFloat(e.amount.$numberDecimal), 0);
  return <div className="total-amount">Total: ${total.toFixed(2)}</div>;
}
