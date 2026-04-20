import { useState, useMemo } from "react";
import "./Transactions.css";
import { calculatePoints } from "../../utils/rewards";
import {
  ITEMS_PER_PAGE,
  INITIAL_PAGE_NO,
  INITIAL_FILTER_ENABLE,
  INITIAL_FILTERS_TRANSACTIONS,
} from "../../constants/pages";
import { getAllTransactions } from "../../utils/dashboard";
import { useAppContext } from "../../context/AppContext";
import Spinner from "../../components/Spinner/Spinner";
import Error from "../../components/Error/Error";

export default function Transactions() {
  const { data, loading, error } = useAppContext();

  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE_NO);
  const [showFilters, setShowFilters] = useState(INITIAL_FILTER_ENABLE);

  // form inputs
  const [filterInputs, setFilterInputs] = useState(
    INITIAL_FILTERS_TRANSACTIONS,
  );

  // applied filters
  const [appliedFilters, setAppliedFilters] = useState(
    INITIAL_FILTERS_TRANSACTIONS,
  );

  const handleResetFilters = () => {
    setFilterInputs(INITIAL_FILTERS_TRANSACTIONS);
    setAppliedFilters(INITIAL_FILTERS_TRANSACTIONS);
    setCurrentPage(1);
  };

  // all transactions (memoized)
  const allTransactions = useMemo(() => {
    return getAllTransactions(data);
  }, [data]);

  // filtering
  const filteredData = useMemo(() => {
    const { startDate, endDate, minAmount, maxAmount, minPoints, maxPoints } =
      appliedFilters;

    return allTransactions.filter((t) => {
      const points = calculatePoints(t.amount);
      const txnDate = new Date(t.date);

      return (
        (startDate ? txnDate >= new Date(startDate) : true) &&
        (endDate ? txnDate <= new Date(endDate) : true) &&
        (minAmount ? t.amount >= Number(minAmount) : true) &&
        (maxAmount ? t.amount <= Number(maxAmount) : true) &&
        (minPoints ? points >= Number(minPoints) : true) &&
        (maxPoints ? points <= Number(maxPoints) : true)
      );
    });
  }, [allTransactions, appliedFilters]);

  // pagination
  const totalPages = useMemo(() => {
    return Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  }, [filteredData]);

  const currentTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  if (loading) return <Spinner />;
  if (error) return <Error message={error} />;

  return (
    <div className="transactions">
      <div className="header">
        <h2>Transactions</h2>

        <button
          className="filter-toggle"
          onClick={() => setShowFilters((prev) => !prev)}
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {showFilters && (
        <div className="filters">
          <input
            type="date"
            value={filterInputs.startDate}
            onChange={(e) =>
              setFilterInputs((prev) => ({
                ...prev,
                startDate: e.target.value,
              }))
            }
          />

          <input
            type="date"
            value={filterInputs.endDate}
            onChange={(e) =>
              setFilterInputs((prev) => ({
                ...prev,
                endDate: e.target.value,
              }))
            }
          />

          <input
            type="number"
            placeholder="Min Amount"
            value={filterInputs.minAmount}
            onChange={(e) =>
              setFilterInputs((prev) => ({
                ...prev,
                minAmount: e.target.value,
              }))
            }
          />

          <input
            type="number"
            placeholder="Max Amount"
            value={filterInputs.maxAmount}
            onChange={(e) =>
              setFilterInputs((prev) => ({
                ...prev,
                maxAmount: e.target.value,
              }))
            }
          />

          <input
            type="number"
            placeholder="Min Points"
            value={filterInputs.minPoints}
            onChange={(e) =>
              setFilterInputs((prev) => ({
                ...prev,
                minPoints: e.target.value,
              }))
            }
          />

          <input
            type="number"
            placeholder="Max Points"
            value={filterInputs.maxPoints}
            onChange={(e) =>
              setFilterInputs((prev) => ({
                ...prev,
                maxPoints: e.target.value,
              }))
            }
          />

          <div className="filter-actions">
            <button
              className="apply-btn"
              onClick={() => {
                setAppliedFilters(filterInputs);
                setCurrentPage(1);
              }}
            >
              Apply Filters
            </button>

            <button className="reset-btn" onClick={handleResetFilters}>
              Reset
            </button>
          </div>
        </div>
      )}

      <table className="txn-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Reward Points</th>
          </tr>
        </thead>

        <tbody>
          {currentTransactions.map((t) => (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td>{t.customerName}</td>
              <td>${t.amount}</td>
              <td>{calculatePoints(t.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        <span>
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
}
