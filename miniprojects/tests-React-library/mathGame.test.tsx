import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import mathReducer from "../src/app/math-game/store/features/mathSlice";
import { MathGameComponent } from "../src/app/math-game/MathGameComponent";

const mockQuestions = [
  {
    id: "q1",
    question: "What is 7 × 8?",
    options: ["54", "56", "58"],
    correctIndex: 1,
  },
  {
    id: "q2",
    question: "If x + 5 = 12, what is x?",
    options: ["6", "7", "8"],
    correctIndex: 1,
  },
  {
    id: "q3",
    question: "What is the square root of 81?",
    options: ["9", "8", "7"],
    correctIndex: 0,
  },
];

describe("Math Game Component", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({ reducer: { math: mathReducer } });
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ body: mockQuestions }),
      })
    ) as unknown as typeof fetch;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders the math quiz component and loads questions", async () => {
    render(
      <Provider store={store}>
        <MathGameComponent />
      </Provider>
    );

    expect(screen.getByText(/Math Quiz/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/What is 7 × 8?/)).toBeInTheDocument();
    });
  });

  it("displays the question counter and score", async () => {
    render(
      <Provider store={store}>
        <MathGameComponent />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Question 1 of 3/)).toBeInTheDocument();
      expect(screen.getByText(/Score: 0/)).toBeInTheDocument();
    });
  });

  it("displays all answer options for the current question", async () => {
    render(
      <Provider store={store}>
        <MathGameComponent />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("54")).toBeInTheDocument();
      expect(screen.getByText("56")).toBeInTheDocument();
      expect(screen.getByText("58")).toBeInTheDocument();
    });
  });

  it("highlights the correct option when selected", async () => {
    render(
      <Provider store={store}>
        <MathGameComponent />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("56")).toBeInTheDocument();
    });

    const correctOption = screen.getByRole("button", { name: "56" });
    fireEvent.click(correctOption);

    await waitFor(() => {
      expect(correctOption).toHaveClass("correct");
    });
  });

  it("shows the incorrect option styling when wrong answer is selected", async () => {
    render(
      <Provider store={store}>
        <MathGameComponent />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("54")).toBeInTheDocument();
    });

    const incorrectOption = screen.getByRole("button", { name: "54" });
    fireEvent.click(incorrectOption);

    await waitFor(() => {
      expect(incorrectOption).toHaveClass("wrong");
    });
  });

  it("increments score when correct answer is selected", async () => {
    render(
      <Provider store={store}>
        <MathGameComponent />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("56")).toBeInTheDocument();
    });

    const correctOption = screen.getByRole("button", { name: "56" });
    fireEvent.click(correctOption);

    await waitFor(() => {
      expect(screen.getByText(/Score: 1/)).toBeInTheDocument();
    });
  });

  it("disables all options after selection", async () => {
    render(
      <Provider store={store}>
        <MathGameComponent />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("56")).toBeInTheDocument();
    });

    const correctOption = screen.getByRole("button", { name: "56" });
    fireEvent.click(correctOption);

    await waitFor(() => {
      const allOptions = screen.getAllByRole("button");
      const questionButtons = allOptions.filter(
        (btn) => !btn.textContent?.includes("Next") && !btn.textContent?.includes("Restart")
      );
      questionButtons.forEach((btn) => {
        expect(btn).toBeDisabled();
      });
    });
  });

  it("navigates to the next question when Next button is clicked", async () => {
    render(
      <Provider store={store}>
        <MathGameComponent />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/What is 7 × 8?/)).toBeInTheDocument();
    });

    const nextButton = screen.getByRole("button", { name: /Next/i });
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText(/If x \+ 5 = 12/)).toBeInTheDocument();
      expect(screen.getByText(/Question 2 of 3/)).toBeInTheDocument();
    });
  });

  it("disables Next button on the last question", async () => {
    render(
      <Provider store={store}>
        <MathGameComponent />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/What is 7 × 8?/)).toBeInTheDocument();
    });

    const nextButton = screen.getByRole("button", { name: /Next/i });

    // Navigate to question 2
    fireEvent.click(nextButton);
    await waitFor(() => {
      expect(screen.getByText(/If x \+ 5 = 12/)).toBeInTheDocument();
    });

    // Navigate to question 3 (last)
    fireEvent.click(nextButton);
    await waitFor(() => {
      expect(screen.getByText(/What is the square root of 81?/)).toBeInTheDocument();
    });

    // Next button should be disabled
    expect(nextButton).toBeDisabled();
  });

  it("resets the game when Restart button is clicked", async () => {
    render(
      <Provider store={store}>
        <MathGameComponent />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/What is 7 × 8?/)).toBeInTheDocument();
    });

    const nextButton = screen.getByRole("button", { name: /Next/i });
    const restartButton = screen.getByRole("button", { name: /Restart/i });

    // Navigate to next question
    fireEvent.click(nextButton);
    await waitFor(() => {
      expect(screen.getByText(/If x \+ 5 = 12/)).toBeInTheDocument();
    });

    // Restart the game
    fireEvent.click(restartButton);

    await waitFor(() => {
      expect(screen.getByText(/Question 1 of 3/)).toBeInTheDocument();
      expect(screen.getByText(/Score: 0/)).toBeInTheDocument();
      expect(screen.getByText(/What is 7 × 8?/)).toBeInTheDocument();
    });
  });

  it("shows an error message when the API request fails", async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error("Network failed"))) as unknown as typeof fetch;

    render(
      <Provider store={store}>
        <MathGameComponent />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Failed to load questions/i)).toBeInTheDocument();
    });
  });

  it("shows loading message when questions are being fetched", () => {
    global.fetch = jest.fn(() => new Promise(() => {})) as unknown as typeof fetch;

    render(
      <Provider store={store}>
        <MathGameComponent />
      </Provider>
    );

    expect(screen.getByText(/Loading questions/i)).toBeInTheDocument();
  });
});
