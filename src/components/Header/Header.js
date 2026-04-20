import "./Header.css";
import { PAGES } from "../../constants/pages";
import { useAppContext } from "../../context/AppContext";

export default function Header() {
  const { page, setPage } = useAppContext();
  return (
    <div className="header">
      <h2 className="logo">Rewards App</h2>

      <div className="nav">
        <button
          className={`nav-btn ${page === PAGES.DASHBOARD ? "active" : ""}`}
          onClick={() => setPage(PAGES.DASHBOARD)}
        >
          Dashboard
        </button>

        <button
          className={`nav-btn ${page === PAGES.TRANSACTIONS ? "active" : ""}`}
          onClick={() => setPage(PAGES.TRANSACTIONS)}
        >
          Transactions
        </button>

        <button
          className={`nav-btn ${page === PAGES.CUSTOMERS ? "active" : ""}`}
          onClick={() => setPage(PAGES.CUSTOMERS)}
        >
          Customers
        </button>
      </div>
    </div>
  );
}
