import { getCustomerPoints, calculateAge } from "./customers";

describe("getCustomerPoints", () => {
  test("calculates total points correctly", () => {
    const customer = {
      transactions: [{ amount: 120 }, { amount: 80 }],
    };

    expect(getCustomerPoints(customer)).toBe(90);
  });

  test("returns 0 when no transactions", () => {
    const customer = { transactions: [] };
    expect(getCustomerPoints(customer)).toBe(0);
  });
});

describe("calculateAge", () => {
  test("calculates correct age before birthday in year", () => {
    const dob = "2000-06-15";
    expect(calculateAge(dob)).toBe(25);
  });

  test("calculates correct age after birthday in year", () => {
    const dob = "2000-03-10";
    expect(calculateAge(dob)).toBe(26);
  });

  test("handles exact birthday correctly", () => {
    const dob = "2000-05-30";
    expect(calculateAge(dob)).toBe(26);
  });

  test("handles edge case at month boundary", () => {
    const dob = "2000-05-31";
    expect(calculateAge(dob)).toBe(25);
  });
});
