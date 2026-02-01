export default function FilterSort({ category, setCategory, sort, setSort, categories }) {
  return (
    <div className="filter-sort">
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map(c => <option key={c} value={c}>{c}</option>)}
      </select>

      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="datedesc">Date Desc</option>
        <option value="dateasc">Date Asc</option>
        <option value="amountdesc">Amount Desc</option>
        <option value="amountasc">Amount Asc</option>
      </select>
    </div>
  );
}
