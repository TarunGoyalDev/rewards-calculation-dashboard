import { fetchCustomersData } from "./api";
import data from "../data/data.json";

describe("fetchCustomersData", () => {
  test("returns data after delay", async () => {
    const result = await fetchCustomersData();

    expect(result).toEqual(data);
  });
});
