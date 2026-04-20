import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Customers from "./Customers";
import { useAppContext } from "../../context/AppContext";

jest.mock("../../context/AppContext");

const mockData = [
  {
    customerId: 1,
    firstName: "John",
    lastName: "Doe",
    gender: "Male",
    city: "Delhi",
    dob: "2000-01-01",
    transactions: [{ amount: 120 }, { amount: 80 }],
  },
  {
    customerId: 2,
    firstName: "Jane",
    lastName: "Smith",
    gender: "Female",
    city: "Mumbai",
    dob: "1995-01-01",
    transactions: [{ amount: 200 }],
  },
];

describe("Customers Component", () => {
  test("should show loading spinner initially", () => {
    useAppContext.mockReturnValue({
      data: [],
      loading: true,
      error: null,
    });

    render(<Customers />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("should render customers after loading", () => {
    useAppContext.mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
    });

    render(<Customers />);

    expect(screen.getByText(/customers/i)).toBeInTheDocument();
    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    expect(screen.getByText(/delhi/i)).toBeInTheDocument();
  });

  test("should toggle filters", () => {
    useAppContext.mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
    });

    render(<Customers />);

    const button = screen.getByText(/show filters/i);

    fireEvent.click(button);
    expect(screen.getByPlaceholderText(/search name/i)).toBeInTheDocument();

    fireEvent.click(button);
    expect(
      screen.queryByPlaceholderText(/search name/i),
    ).not.toBeInTheDocument();
  });

  test("should filter by search name (with Apply button)", () => {
    useAppContext.mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
    });

    render(<Customers />);

    fireEvent.click(screen.getByText(/show filters/i));

    const input = screen.getByPlaceholderText(/search name/i);
    fireEvent.change(input, { target: { value: "Jane" } });

    fireEvent.click(screen.getByText(/apply filters/i));

    expect(screen.getByText(/jane smith/i)).toBeInTheDocument();
    expect(screen.queryByText(/john doe/i)).not.toBeInTheDocument();
  });

  test("should filter by gender (with Apply button)", () => {
    useAppContext.mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
    });

    render(<Customers />);

    fireEvent.click(screen.getByText(/show filters/i));

    const genderSelect = screen.getByDisplayValue(/all gender/i);
    fireEvent.change(genderSelect, { target: { value: "Female" } });

    fireEvent.click(screen.getByText(/apply filters/i));

    expect(screen.getByText(/jane smith/i)).toBeInTheDocument();
    expect(screen.queryByText(/john doe/i)).not.toBeInTheDocument();
  });

  test("should show error state", () => {
    useAppContext.mockReturnValue({
      data: [],
      loading: false,
      error: "Something went wrong",
    });

    render(<Customers />);

    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
});
