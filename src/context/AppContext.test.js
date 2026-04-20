import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { AppProvider, useAppContext } from "./AppContext";
import { fetchCustomersData } from "../services/api";
import { PAGES } from "../constants/pages";

jest.mock("../services/api");

const TestComponent = () => {
  const { page, data, loading, error } = useAppContext();

  return (
    <div>
      <span data-testid="page">{page}</span>
      <span data-testid="loading">{loading ? "true" : "false"}</span>
      <span data-testid="error">{error || ""}</span>
      <span data-testid="data-length">{data.length}</span>
    </div>
  );
};

describe("AppContext", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should initialize with default state", async () => {
    fetchCustomersData.mockResolvedValue([]);

    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>,
    );

    expect(screen.getByTestId("loading")).toHaveTextContent("true");

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("false");
    });

    expect(screen.getByTestId("page")).toHaveTextContent(PAGES.DASHBOARD);
    expect(screen.getByTestId("data-length")).toHaveTextContent("0");
  });

  test("should load data successfully from API", async () => {
    const mockData = [{ id: 1 }, { id: 2 }];
    fetchCustomersData.mockResolvedValue(mockData);

    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("false");
    });

    expect(screen.getByTestId("data-length")).toHaveTextContent("2");
    expect(screen.getByTestId("error")).toHaveTextContent("");
  });

  test("should handle API error and set error message", async () => {
    fetchCustomersData.mockRejectedValue(new Error("API Failed"));

    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("false");
    });

    expect(screen.getByTestId("error")).toHaveTextContent("API Failed");
  });

  test("should fallback to default error message when error has no message", async () => {
    fetchCustomersData.mockRejectedValue({});

    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("false");
    });

    expect(screen.getByTestId("error")).toHaveTextContent(
      "Failed to load data",
    );
  });
});
