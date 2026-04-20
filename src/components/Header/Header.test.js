import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";
import { PAGES } from "../../constants/pages";
import { useAppContext } from "../../context/AppContext";

jest.mock("../../context/AppContext");

describe("Header Component", () => {
  test("should render all navigation buttons", () => {
    useAppContext.mockReturnValue({
      page: PAGES.DASHBOARD,
      setPage: jest.fn(),
    });

    render(<Header />);

    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/transactions/i)).toBeInTheDocument();
    expect(screen.getByText(/customers/i)).toBeInTheDocument();
  });

  test("should highlight active page", () => {
    useAppContext.mockReturnValue({
      page: PAGES.TRANSACTIONS,
      setPage: jest.fn(),
    });

    render(<Header />);

    const activeButton = screen.getByText(/transactions/i);

    expect(activeButton).toHaveClass("active");
  });

  test("should call setPage on button click", () => {
    const mockSetPage = jest.fn();

    useAppContext.mockReturnValue({
      page: PAGES.DASHBOARD,
      setPage: mockSetPage,
    });

    render(<Header />);

    fireEvent.click(screen.getByText(/customers/i));

    expect(mockSetPage).toHaveBeenCalledWith(PAGES.CUSTOMERS);
  });
});
