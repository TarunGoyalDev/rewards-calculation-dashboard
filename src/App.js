import { PAGES } from "./constants/pages";
import Header from "./components/Header/Header";
import Dashboard from "./pages/Dashboard/Dashboard";
import Transactions from "./pages/Transactions/Transactions";
import Customers from "./pages/Customers/Customers";
import { useAppContext } from "./context/AppContext";

function App() {
  const { page } = useAppContext();

  const renderPage = () => {
    if (page === PAGES.TRANSACTIONS) return <Transactions />;
    if (page === PAGES.CUSTOMERS) return <Customers />;
    return <Dashboard />;
  };

  return (
    <div>
      <Header />
      {renderPage()}
    </div>
  );
}

export default App;
