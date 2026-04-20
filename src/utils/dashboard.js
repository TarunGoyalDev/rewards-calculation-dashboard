import { calculatePoints } from "./rewards";
import { months } from "../constants/pages";

export const filterByMonth = (customers, selectedMonth) => {
  if (selectedMonth === "ALL") return customers;

  return customers.map((customer) => ({
    ...customer,
    transactions: customer.transactions.filter(
      (transaction) => transaction.date.split("-")[1] === selectedMonth,
    ),
  }));
};

export const getAllTransactions = (customers) => {
  return customers.flatMap((customer) =>
    customer.transactions.map((transaction) => ({
      ...transaction,
      customerName: `${customer.firstName} ${customer.lastName}`,
      city: customer.city,
    })),
  );
};

export const getKPIs = (customers) => {
  const allTransactions = getAllTransactions(customers);

  const totalCustomers = customers.length;
  const totalTransactions = allTransactions.length;

  const totalPoints = allTransactions.reduce(
    (total, transaction) => total + calculatePoints(transaction.amount),
    0,
  );

  const totalAmount = allTransactions.reduce(
    (total, transaction) => total + transaction.amount,
    0,
  );

  return {
    totalCustomers,
    totalTransactions,
    totalPoints,
    avgPoints: Math.round(totalPoints / totalCustomers || 0),
    avgSpend: Math.round(totalAmount / totalCustomers || 0),
  };
};

export const getTopCustomers = (customers) => {
  return customers
    .map((customer) => ({
      name: `${customer.firstName} ${customer.lastName}`,
      total: customer.transactions.reduce(
        (total, transaction) => total + transaction.amount,
        0,
      ),
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 3);
};

export const getTopCities = (customers) => {
  const cityTotals = {};

  customers.forEach((customer) => {
    customer.transactions.forEach((transaction) => {
      cityTotals[customer.city] =
        (cityTotals[customer.city] || 0) + transaction.amount;
    });
  });

  return Object.entries(cityTotals)
    .map(([city, total]) => ({ city, total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 3);
};

const monthLookup = Object.fromEntries(
  months.map((month) => [month.value, month.label]),
);

export const getTopMonths = (customers) => {
  const monthlyTotals = {};

  customers.forEach((customer) => {
    customer.transactions.forEach((transaction) => {
      const month = transaction.date.split("-")[1];
      monthlyTotals[month] = (monthlyTotals[month] || 0) + transaction.amount;
    });
  });

  return Object.entries(monthlyTotals)
    .map(([month, total]) => ({
      month: monthLookup[month] || month,
      total,
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 3);
};
