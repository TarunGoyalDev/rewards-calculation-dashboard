import { calculatePoints } from "./rewards";

describe("calculatePoints", () => {
  test("returns 0 for amount <= 50", () => {
    expect(calculatePoints(30)).toBe(0);
  });

  test("returns correct points for amount between 50 and 100", () => {
    expect(calculatePoints(60)).toBe(0);
  });

  test("returns correct points for amount > 100", () => {
    expect(calculatePoints(120)).toBe(90);
    expect(calculatePoints(150)).toBe(150);
  });

  test("handles edge cases correctly", () => {
    expect(calculatePoints(100)).toBe(0);
    expect(calculatePoints(51)).toBe(0);
  });
});
