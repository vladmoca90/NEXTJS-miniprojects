import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MessageDetails from "../src/app/send-message/message-value/page";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}));

import { useSearchParams } from "next/navigation";

describe("MessageDetails Page", () => {
  it("shows fallback text when no message is provided", () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => null,
    });

    render(<MessageDetails />);

    expect(
      screen.getByText("No message provided.")
    ).toBeInTheDocument();
  });

  it("renders the provided message text", () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) =>
        key === "messageText" ? "Hello from Jest!" : null,
    });

    render(<MessageDetails />);

    expect(
      screen.getByText("Hello from Jest!")
    ).toBeInTheDocument();
  });

  it("renders the container with proper aria-live and id", () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => "Hi",
    });

    render(<MessageDetails />);

    const container = document.getElementById("sentMessage");

    expect(container).toBeInTheDocument();
    expect(container).toHaveAttribute("aria-live", "polite");
  });
});