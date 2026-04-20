import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Dashboard from "./Dashboard";
import { useAppContext } from "../../context/AppContext";

jest.mock("../../context/AppContext");

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

describe("Dashboard Component", () => {
  test("should show loading spinner initially", () => {
    useAppContext.mockReturnValue({
      data: [],
      loading: true,
      error: null,
    });

    render(<Dashboard />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("should render dashboard after data loads", () => {
    useAppContext.mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
    });

    render(<Dashboard />);

    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/total customers/i)).toBeInTheDocument();
    expect(screen.getByText(/total transactions/i)).toBeInTheDocument();

    expect(screen.getByText(/top customers/i)).toBeInTheDocument();
    expect(screen.getByText(/top cities/i)).toBeInTheDocument();
    expect(screen.getByText(/top months/i)).toBeInTheDocument();
  });

  test("should change data when month is selected", () => {
    useAppContext.mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
    });

    render(<Dashboard />);

    const dropdown = screen.getByRole("combobox");

    fireEvent.change(dropdown, { target: { value: "01" } });

    expect(screen.getByText(/total customers/i)).toBeInTheDocument();
  });

  test("should show error message", () => {
    useAppContext.mockReturnValue({
      data: [],
      loading: false,
      error: "Something went wrong",
    });

    render(<Dashboard />);

    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
});
