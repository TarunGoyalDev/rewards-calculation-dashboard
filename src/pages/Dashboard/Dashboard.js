import { useState, useMemo } from "react";
import "./Dashboard.css";
import { months } from "../../constants/pages";
import Spinner from "../../components/Spinner/Spinner";
import Error from "../../components/Error/Error";
import { useAppContext } from "../../context/AppContext";

import {
  filterByMonth,
  getKPIs,
  getTopCustomers,
  getTopCities,
  getTopMonths,
} from "../../utils/dashboard";

export default function Dashboard() {
  const { data, loading, error } = useAppContext();
  const [month, setMonth] = useState(months[0].value);

  const filteredData = useMemo(() => {
    return filterByMonth(data, month);
  }, [data, month]);

  const { kpis, topCustomers, topCities } = useMemo(() => {
    return {
      kpis: getKPIs(filteredData),
      topCustomers: getTopCustomers(filteredData),
      topCities: getTopCities(filteredData),
    };
  }, [filteredData]);

  const topMonths = useMemo(() => {
    return getTopMonths(data);
  }, [data]);

  if (loading) return <Spinner />;
  if (error) return <Error message={error} />;

  return (
    <div className="dashboard">
      <div className="header">
        <h2>Dashboard</h2>

        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          {months.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
      </div>

      <div className="kpi-grid">
        <div className="card">
          <h4>Total Customers</h4>
          <p>{kpis?.totalCustomers || 0}</p>
        </div>

        <div className="card">
          <h4>Total Transactions</h4>
          <p>{kpis?.totalTransactions || 0}</p>
        </div>

        <div className="card">
          <h4>Total Points</h4>
          <p>{kpis?.totalPoints || 0}</p>
        </div>

        <div className="card">
          <h4>Avg Reward Points / Customer</h4>
          <p>{kpis?.avgPoints || 0}</p>
        </div>

        <div className="card">
          <h4>Avg Total Spend / Customer</h4>
          <p>₹{kpis?.avgSpend || 0}</p>
        </div>
      </div>

      <div className="top-section">
        <div className="section">
          <h3>Top Customers</h3>
          <ul>
            {topCustomers.map((c, i) => (
              <li key={i}>
                {i + 1}. {c.name} - ${c.total}
              </li>
            ))}
          </ul>
        </div>

        <div className="section">
          <h3>Top Cities</h3>
          <ul>
            {topCities.map((c, i) => (
              <li key={i}>
                {i + 1}. {c.city} - ${c.total}
              </li>
            ))}
          </ul>
        </div>

        <div className="section">
          <h3>Top Months</h3>
          <ul>
            {topMonths.map((m, i) => (
              <li key={i}>
                {i + 1}. {m.month} - ${m.total}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
