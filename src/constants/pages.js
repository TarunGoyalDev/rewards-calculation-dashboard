export const PAGES = {
  DASHBOARD: "dashboard",
  TRANSACTIONS: "transactions",
  CUSTOMERS: "customers",
};

export const months = [
  { label: "All", value: "ALL" },
  { label: "January", value: "01" },
  { label: "February", value: "02" },
  { label: "March", value: "03" },
  { label: "April", value: "04" },
  { label: "May", value: "05" },
];

export const INITIAL_FILTERS_CUSTOMER = {
  search: "",
  gender: "",
  city: "",
  minAge: "",
  maxAge: "",
  minPoints: "",
  maxPoints: "",
};

export const INITIAL_FILTERS_TRANSACTIONS = {
  startDate: "",
  endDate: "",
  minAmount: "",
  maxAmount: "",
  minPoints: "",
  maxPoints: "",
};

export const ITEMS_PER_PAGE = 10;
export const INITIAL_PAGE_NO = 1;
export const INITIAL_LOADING_STATE = false;
export const INITIAL_FILTER_ENABLE = false;
