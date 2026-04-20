import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { fetchCustomersData } from "../services/api";
import { PAGES } from "../constants/pages";
import { INITIAL_LOADING_STATE } from "../constants/pages";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [page, setPage] = useState(PAGES.DASHBOARD);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(INITIAL_LOADING_STATE);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const res = await fetchCustomersData();
        setData(res);
      } catch (err) {
        setError(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        page,
        setPage,
        data,
        loading,
        error,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAppContext = () => useContext(AppContext);
