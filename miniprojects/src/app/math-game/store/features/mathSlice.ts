import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MathQuestion } from "../../../../../data/math-game/questions";

interface MathState {
  questions: MathQuestion[];
  currentIndex: number;
  selectedIndex: number | null;
  score: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: MathState = {
  questions: [],
  currentIndex: 0,
  selectedIndex: null,
  score: 0,
  status: "idle",
  error: null,
};

export const mathSlice = createSlice({
  name: "math",
  initialState,
  reducers: {
    setQuestions(state, action: PayloadAction<MathQuestion[]>) {
      state.questions = action.payload;
      state.currentIndex = 0;
      state.selectedIndex = null;
      state.score = 0;
      state.status = "succeeded";
      state.error = null;
    },

    selectOption(state, action: PayloadAction<number>) {
      if (state.selectedIndex !== null) return;

      state.selectedIndex = action.payload;

      const question = state.questions[state.currentIndex];

      if (!question) return;

      if (action.payload === question.correctIndex) {
        state.score += 1;
      }
    },

    nextQuestion(state) {
      state.currentIndex = Math.min(
        state.currentIndex + 1,
        state.questions.length - 1
      );

      state.selectedIndex = null;
    },

    resetGame(state) {
      state.currentIndex = 0;
      state.selectedIndex = null;
      state.score = 0;
      state.status = "idle";
      state.error = null;
    },

    setStatus(state, action: PayloadAction<MathState["status"]>) {
      state.status = action.payload;
    },

    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const {
  setQuestions,
  selectOption,
  nextQuestion,
  resetGame,
  setStatus,
  setError,
} = mathSlice.actions;

export default mathSlice.reducer;