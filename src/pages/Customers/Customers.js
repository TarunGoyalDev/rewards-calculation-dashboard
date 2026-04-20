import { useState, useMemo } from "react";
import "./Customers.css";
import {
  ITEMS_PER_PAGE,
  INITIAL_PAGE_NO,
  INITIAL_FILTER_ENABLE,
  INITIAL_FILTERS_CUSTOMER,
} from "../../constants/pages";
import { calculateAge, getCustomerPoints } from "../../utils/customers";
import { useAppContext } from "../../context/AppContext";
import Spinner from "../../components/Spinner/Spinner";
import Error from "../../components/Error/Error";

export default function Customers() {
  const { data, loading, error } = useAppContext();

  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE_NO);
  const [showFilters, setShowFilters] = useState(INITIAL_FILTER_ENABLE);

  const [filterInputs, setFilterInputs] = useState(INITIAL_FILTERS_CUSTOMER);

  const [appliedFilters, setAppliedFilters] = useState(filterInputs);

  const handleResetFilters = () => {
    setFilterInputs(INITIAL_FILTERS_CUSTOMER);
    setAppliedFilters(INITIAL_FILTERS_CUSTOMER);
    setCurrentPage(INITIAL_PAGE_NO);
  };

  const cities = useMemo(() => {
    return [...new Set(data.map((c) => c.city))];
  }, [data]);

  const filteredData = useMemo(() => {
    const { search, gender, city, minAge, maxAge, minPoints, maxPoints } =
      appliedFilters;

    return data.filter((c) => {
      const fullName = `${c.firstName} ${c.lastName}`.toLowerCase();
      const age = calculateAge(c.dob);
      const points = getCustomerPoints(c);

      return (
        fullName.includes(search.toLowerCase()) &&
        (gender ? c.gender === gender : true) &&
        (city ? c.city === city : true) &&
        (minAge ? age >= Number(minAge) : true) &&
        (maxAge ? age <= Number(maxAge) : true) &&
        (minPoints ? points >= Number(minPoints) : true) &&
        (maxPoints ? points <= Number(maxPoints) : true)
      );
    });
  }, [data, appliedFilters]);

  const currentCustomers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  }, [filteredData]);

  if (loading) return <Spinner />;
  if (error) return <Error message={error} />;

  return (
    <div className="customers">
      <div className="header">
        <h2>Customers</h2>

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
            placeholder="Search name"
            value={filterInputs.search}
            onChange={(e) =>
              setFilterInputs((prev) => ({
                ...prev,
                search: e.target.value,
              }))
            }
          />

          <input
            placeholder="Min Age"
            type="number"
            value={filterInputs.minAge}
            onChange={(e) =>
              setFilterInputs((prev) => ({
                ...prev,
                minAge: e.target.value,
              }))
            }
          />

          <input
            placeholder="Max Age"
            type="number"
            value={filterInputs.maxAge}
            onChange={(e) =>
              setFilterInputs((prev) => ({
                ...prev,
                maxAge: e.target.value,
              }))
            }
          />

          <select
            value={filterInputs.gender}
            onChange={(e) =>
              setFilterInputs((prev) => ({
                ...prev,
                gender: e.target.value,
              }))
            }
          >
            <option value="">All Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <select
            value={filterInputs.city}
            onChange={(e) =>
              setFilterInputs((prev) => ({
                ...prev,
                city: e.target.value,
              }))
            }
          >
            <option value="">All Cities</option>
            {cities.map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}
          </select>

          <input
            placeholder="Min Points"
            type="number"
            value={filterInputs.minPoints}
            onChange={(e) =>
              setFilterInputs((prev) => ({
                ...prev,
                minPoints: e.target.value,
              }))
            }
          />

          <input
            placeholder="Max Points"
            type="number"
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

      <table className="customer-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>City</th>
            <th>Reward Points</th>
          </tr>
        </thead>

        <tbody>
          {currentCustomers.map((c) => (
            <tr key={c.customerId}>
              <td>
                {c.firstName} {c.lastName}
              </td>
              <td>{calculateAge(c.dob)}</td>
              <td>{c.gender}</td>
              <td>{c.city}</td>
              <td>{getCustomerPoints(c)}</td>
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
