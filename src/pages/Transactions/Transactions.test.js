import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Transactions from "./Transactions";
import { useAppContext } from "../../context/AppContext";

jest.mock("../../context/AppContext");

const mockData = [
  {
    firstName: "John",
    lastName: "Doe",
    transactions: [
      { id: 1, amount: 120, date: "2026-01-15" },
      { id: 2, amount: 50, date: "2026-02-10" },
    ],
  },
];

describe("Transactions Component", () => {
  test("should show loading spinner initially", () => {
    useAppContext.mockReturnValue({
      data: [],
      loading: true,
      error: null,
    });

    render(<Transactions />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("should render transactions after loading", () => {
    useAppContext.mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
    });

    render(<Transactions />);
    expect(screen.getByText(/transactions/i)).toBeInTheDocument();
  });

  test("should toggle filter panel", () => {
    useAppContext.mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
    });

    render(<Transactions />);

    const button = screen.getByText(/show filters/i);

    fireEvent.click(button);
    expect(screen.getByPlaceholderText(/min amount/i)).toBeInTheDocument();

    fireEvent.click(button);
    expect(
      screen.queryByPlaceholderText(/min amount/i),
    ).not.toBeInTheDocument();
  });

  test("should filter transactions by min amount (with Apply button)", () => {
    useAppContext.mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
    });

    render(<Transactions />);

    fireEvent.click(screen.getByText(/show filters/i));

    const input = screen.getByPlaceholderText(/min amount/i);
    fireEvent.change(input, { target: { value: "100" } });

    fireEvent.click(screen.getByText(/apply filters/i));

    expect(screen.getByText("$120")).toBeInTheDocument();
    expect(screen.queryByText("$50")).not.toBeInTheDocument();
  });

  test("should show error state", () => {
    useAppContext.mockReturnValue({
      data: [],
      loading: false,
      error: "Something went wrong",
    });

    render(<Transactions />);

    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
});
