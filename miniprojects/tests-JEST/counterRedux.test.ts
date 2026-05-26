import reducer, {
  increment,
  decrement,
  incrementByAmount,
  incrementAsync,
} from "../src/app/counter-redux/state/counter/counterState";

describe("Counter Slice", () => {
  const initialState = { value: 0 };

  it("should return the initial state when passed an unknown action", () => {
    const nextState = reducer(undefined, { type: "unknown" });
    expect(nextState).toEqual(initialState);
  });

  describe("increment", () => {
    it("should increment the value by 1", () => {
      const action = increment();
      const nextState = reducer(initialState, action);

      expect(nextState.value).toBe(1);
    });

    it("should increment from a non-zero value", () => {
      const stateWithValue = { value: 5 };
      const action = increment();
      const nextState = reducer(stateWithValue, action);

      expect(nextState.value).toBe(6);
    });
  });

  describe("decrement", () => {
    it("should decrement the value by 1", () => {
      const stateWithValue = { value: 1 };
      const action = decrement();
      const nextState = reducer(stateWithValue, action);

      expect(nextState.value).toBe(0);
    });

    it("should decrement from a negative value", () => {
      const stateWithValue = { value: -1 };
      const action = decrement();
      const nextState = reducer(stateWithValue, action);

      expect(nextState.value).toBe(-2);
    });
  });

  describe("incrementByAmount", () => {
    it("should increment the value by the specified amount", () => {
      const action = incrementByAmount(5);
      const nextState = reducer(initialState, action);

      expect(nextState.value).toBe(5);
    });

    it("should handle negative amounts", () => {
      const action = incrementByAmount(-3);
      const nextState = reducer(initialState, action);

      expect(nextState.value).toBe(-3);
    });
  });

  describe("incrementAsync", () => {
    it("should handle incrementAsync.pending", () => {
      const action = { type: incrementAsync.pending.type };
      const nextState = reducer(initialState, action);

      // Since the reducer doesn't change state on pending, it should remain the same
      expect(nextState).toEqual(initialState);
    });

    it("should increment the value on incrementAsync.fulfilled", () => {
      const action = { type: incrementAsync.fulfilled.type, payload: 10 };
      const nextState = reducer(initialState, action);

      expect(nextState.value).toBe(10);
    });
  });
});
