import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../app/page";

describe("Password Generator", () => {
  it("renders the main heading", () => {
    render(<Home />);
    expect(screen.getByText(/Password Generator/i)).toBeInTheDocument();
  });

  it("generates a password by default on load", () => {
    render(<Home />);
    const passwordBox = screen.getByTitle(/Click to copy to clipboard/i);
    expect(passwordBox.textContent).not.toBe("No password yet");
    expect(passwordBox.textContent?.length).toBeGreaterThan(0);
  });

  it("changes password length on input change and regeneration", () => {
    render(<Home />);
    const input = screen.getByRole("spinbutton");
    const button = screen.getByRole("button", { name: /Generate Password/i });

    fireEvent.change(input, { target: { value: "10" } });
    fireEvent.click(button);

    const passwordBox = screen.getByTitle(/Click to copy to clipboard/i);
    expect(passwordBox.textContent?.length).toBe(10);
  });
});
