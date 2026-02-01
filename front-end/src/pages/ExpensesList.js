import { useEffect, useState } from "react";
import { getExpenses } from "../services/expenseService";
import ExpenseItem from "../components/ExpenseItem";
import FilterSort from "../components/FilterSort";
import TotalAmount from "../components/TotalAmount";

export default function ExpensesList({ refresh }) {
  const [expenses, setExpenses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("datedesc");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const fetchExpenses = async () => {
    const data = await getExpenses();
    setExpenses(data);
  };

  useEffect(() => {
    fetchExpenses();
  }, [refresh]);

  // Filter + sort
  useEffect(() => {
    let temp = [...expenses];
    if (category) temp = temp.filter((e) => e.category === category);

    switch (sort) {
      case "datedesc":
        temp.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "dateasc":
        temp.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "amountdesc":
        temp.sort((a, b) => parseFloat(b.amount.$numberDecimal) - parseFloat(a.amount.$numberDecimal));
        break;
      case "amountasc":
        temp.sort((a, b) => parseFloat(a.amount.$numberDecimal) - parseFloat(b.amount.$numberDecimal));
        break;
        default:
            temp.sort((a, b) => a.expenseId - b.expenseId);
    }

    setFiltered(temp);
    setCurrentPage(1); 
  }, [expenses, category, sort]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const categories = [...new Set(expenses.map((e) => e.category))];

  return (
    <div>
      <FilterSort
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
        categories={categories}
      />

      <TotalAmount expenses={filtered} />

      <ul>
        {currentItems.map((e) => (
          <ExpenseItem key={e.expenseId} expense={e} />
        ))}
      </ul>

      <div style={{ textAlign: "center", marginTop: "15px" }}>
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          style={{
            marginRight: "10px",
            padding: "8px 16px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: currentPage === 1 ? "#bdc3c7" : "#1abc9c",
            color: "#fff",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          Previous
        </button>

        <span style={{ margin: "0 10px", fontWeight: "bold" }}>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          style={{
            marginLeft: "10px",
            padding: "8px 16px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: currentPage === totalPages ? "#bdc3c7" : "#1abc9c",
            color: "#fff",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
