"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/store";
import { setQuestions, selectOption, nextQuestion, resetGame, setStatus, setError } from "./store/features/mathSlice";

export function MathGameComponent() {
  const dispatch = useAppDispatch();
  const { questions, currentIndex, selectedIndex, score, status, error } = useAppSelector((state) => state.math);

  useEffect(() => {
    if (status !== "idle") return;

    dispatch(setStatus("loading"));

    const loadQuestions = async () => {
      try {
        const response = await fetch("/api/math-game");
        const data = await response.json();
        dispatch(setQuestions(data.body));
      } catch (err) {
        dispatch(setError("Failed to load questions."));
        dispatch(setStatus("failed"));
      }
    };

    loadQuestions();
  }, [dispatch, status]);

  const question = questions[currentIndex];

  if (status === "loading") {
    return <div className="math-loading">Loading questions…</div>;
  }

  if (status === "failed") {
    return <div className="math-error">{error}</div>;
  }

  if (!question) {
    return <div className="math-empty">No questions available.</div>;
  }

  return (
    <section className="math-game">
      <header className="math-header">
        <h1 className="math-header-title">Math Quiz</h1>
        <div  className="math-header-text">
          <p>
            Question {currentIndex + 1} of {questions.length} • Score: {score}
          </p>
        </div>
      </header>

      <div className="math-question">
        <p className="math-q-text">{question.question}</p>
        <div className="math-options">
          {question.options.map((option: string, index: number) => {
            const answered = selectedIndex !== null;
            const isCorrect = index === question.correctIndex;
            const selected = index === selectedIndex;
            const className = answered
              ? selected
                ? isCorrect
                  ? "opt correct"
                  : "opt wrong"
                : isCorrect
                ? "opt correct"
                : "opt"
              : "opt";

            return (
              <button
                key={index}
                className={className}
                onClick={() => dispatch(selectOption(index))}
                disabled={selectedIndex !== null}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      <div className="math-controls">
        <button className="btn btn-green" onClick={() => dispatch(nextQuestion())} disabled={currentIndex >= questions.length - 1}>
          Next
        </button>
        <button className="btn btn-red" onClick={() => dispatch(resetGame())}>Restart</button>
      </div>
    </section>
  );
}
