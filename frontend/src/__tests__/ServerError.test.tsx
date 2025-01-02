import { fireEvent, render, screen } from "@testing-library/react";
import ServerError from "../components/ServerError"; 

describe("ServerError Component", () => {
  const errorMessage = "An unexpected error occurred.";
  beforeAll(() => {
    // Mock the window.location.reload function
    Object.defineProperty(window, "location", {
      writable: true,
      value: { reload: jest.fn() },
    });
  });

  it("displays the error message", () => {
    render(<ServerError errorMessage={errorMessage} />);
    const typographyElement = screen.getByText(errorMessage, { selector: "h6" });
    expect(typographyElement).toBeInTheDocument();
  });

  it("renders the Snackbar with Alert", () => {
    render(<ServerError errorMessage={errorMessage} />);
    expect(screen.getByRole("alert")).toHaveTextContent(errorMessage);
  });

  it("displays the image with the correct alt text", () => {
    render(<ServerError errorMessage={errorMessage} />);
    const imgElement = screen.getByAltText("Error");
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("src", "/server-error.webp");
  });

  it("calls window.location.reload when the Refresh button is clicked", () => {
    render(<ServerError errorMessage={errorMessage} />);

    const refreshButton = screen.getByRole("button", { name: /refresh page/i });
    fireEvent.click(refreshButton);

    expect(window.location.reload).toHaveBeenCalled();
  });
});
