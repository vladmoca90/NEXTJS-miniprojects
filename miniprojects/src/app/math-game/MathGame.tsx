"use client";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { useAppDispatch, useAppSelector } from "./store/store";
import { setQuestions, selectOption, nextQuestion, resetGame, setStatus, setError } from "./store/features/mathSlice";

export function MathGame() {
  const dispatch = useAppDispatch();
  const { questions, currentIndex, selectedIndex, score, status, error } = useAppSelector((state) => state.math);

  useEffect(() => {
    const load = async () => {
      dispatch(setStatus("loading"));
      try {
        const res = await fetch("/api/math");
        const data = await res.json();
        dispatch(setQuestions(data.body));
      } catch (e) {
        dispatch(setError("Failed to load questions."));
        dispatch(setStatus("failed"));
      }
    };

    if (status === "idle") load();
  }, [dispatch, status]);

  const question = questions[currentIndex];

  if (status === "loading") return <div className="math-loading">Loading questions…</div>;
  if (status === "failed") return <div className="math-error">{error}</div>;
  if (!question) return <div className="math-empty">No questions available.</div>;

  return (
    <section className="math-game">
      <header>
        <h1>Math Quiz</h1>
        <p>
          Question {currentIndex + 1} of {questions.length} • Score: {score}
        </p>
      </header>

      <div className="math-question">
        <p className="math-q-text">{question.question}</p>
        <div className="math-options">
          {question.options.map((opt, idx) => {
            const answered = selectedIndex !== null;
            const isCorrect = idx === question.correctIndex;
            const selected = idx === selectedIndex;
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
                key={idx}
                className={className}
                onClick={() => dispatch(selectOption(idx))}
                disabled={selectedIndex !== null}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      <div className="math-controls">
        <button onClick={() => dispatch(nextQuestion())} disabled={currentIndex >= questions.length - 1}>
          Next
        </button>
        <button onClick={() => dispatch(resetGame())}>Restart</button>
      </div>
    </section>
  );
}
