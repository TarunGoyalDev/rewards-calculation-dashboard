import {
  filterByMonth,
  getAllTransactions,
  getKPIs,
  getTopCustomers,
  getTopCities,
  getTopMonths,
} from "./dashboard";

const mockData = [
  {
    firstName: "John",
    lastName: "Doe",
    city: "Delhi",
    transactions: [
      { amount: 120, date: "2026-01-15" },
      { amount: 80, date: "2026-02-10" },
    ],
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    city: "Mumbai",
    transactions: [
      { amount: 200, date: "2026-01-20" },
      { amount: 50, date: "2026-03-05" },
    ],
  },
];

describe("filterByMonth", () => {
  test("returns all data when month is ALL", () => {
    const result = filterByMonth(mockData, "ALL");
    expect(result).toEqual(mockData);
  });

  test("filters transactions by month", () => {
    const result = filterByMonth(mockData, "01");

    expect(result[0].transactions.length).toBe(1);
    expect(result[1].transactions.length).toBe(1);
  });
});

describe("getAllTransactions", () => {
  test("flattens transactions and adds fields", () => {
    const result = getAllTransactions(mockData);

    expect(result.length).toBe(4);
    expect(result[0]).toHaveProperty("customerName");
    expect(result[0]).toHaveProperty("city");
  });
});

describe("getKPIs", () => {
  test("calculates KPI values correctly", () => {
    const result = getKPIs(mockData);

    expect(result.totalCustomers).toBe(2);
    expect(result.totalTransactions).toBe(4);
    expect(result.totalPoints).toBeGreaterThan(0);
    expect(result.avgPoints).toBeGreaterThanOrEqual(0);
    expect(result.avgSpend).toBeGreaterThanOrEqual(0);
  });

  test("handles empty data", () => {
    const result = getKPIs([]);

    expect(result.totalCustomers).toBe(0);
    expect(result.totalTransactions).toBe(0);
    expect(result.totalPoints).toBe(0);
    expect(result.avgPoints).toBe(0);
    expect(result.avgSpend).toBe(0);
  });
});

describe("getTopCustomers", () => {
  test("returns top 3 customers by total amount", () => {
    const result = getTopCustomers(mockData);

    expect(result.length).toBeLessThanOrEqual(3);
    expect(result[0].total).toBeGreaterThanOrEqual(result[1].total);
  });
});

describe("getTopCities", () => {
  test("returns top cities by total amount", () => {
    const result = getTopCities(mockData);

    expect(result.length).toBeLessThanOrEqual(3);
    expect(result[0]).toHaveProperty("city");
    expect(result[0]).toHaveProperty("total");
  });
});

describe("getTopMonths", () => {
  test("returns top months by total amount", () => {
    const result = getTopMonths(mockData);

    expect(result.length).toBeLessThanOrEqual(3);
    expect(result[0]).toHaveProperty("month");
    expect(result[0]).toHaveProperty("total");
  });
});
