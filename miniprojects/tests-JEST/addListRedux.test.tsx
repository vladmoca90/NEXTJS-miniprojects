import reducer, { addPerson } from "../src/app/add-list-redux/store/features/personSlice";

describe("personSlice", () => {
  it("returns the initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual({ persons: [] });
  });

  it("adds a person with a trimmed name", () => {
    const nextState = reducer({ persons: [] }, addPerson({ name: " Alice " }));

    expect(nextState.persons).toEqual([{ id: 1, name: "Alice" }]);
  });

  it("does not add a duplicate person name regardless of casing", () => {
    const firstState = reducer({ persons: [] }, addPerson({ name: "Alice" }));
    const secondState = reducer(firstState, addPerson({ name: "alice" }));

    expect(secondState.persons).toHaveLength(1);
    expect(secondState.persons[0]).toEqual({ id: 1, name: "Alice" });
  });

  it("does not add an empty or whitespace-only name", () => {
    const nextState = reducer({ persons: [] }, addPerson({ name: "   " }));

    expect(nextState.persons).toEqual([]);
  });
});
