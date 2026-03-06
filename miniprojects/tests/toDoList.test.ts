import reducer, {
  addItem,
  removeItem,
  ListItem,
} from "../src/app/to-do-list/store/features/toDoListSlice";

describe("ToDo List Slice", () => {
  const initialState = { items: [] };

  it("should return the initial state when passed an unknown action", () => {
    const nextState = reducer(undefined, { type: "unknown" });
    expect(nextState).toEqual(initialState);
  });

  describe("addItem", () => {
    it("should add a new item with the provided text", () => {
      const text = "Buy milk";
      const action = addItem(text);
      const nextState = reducer(initialState, action);

      expect(nextState.items).toHaveLength(1);
      expect(nextState.items[0].item).toBe(text);
      expect(typeof nextState.items[0].id).toBe("number");
    });

    it("should append additional items without removing existing ones", () => {
      const stateWithOne: { items: ListItem[] } = {
        items: [{ id: 1, item: "First" }],
      };
      const action = addItem("Second");
      const nextState = reducer(stateWithOne, action);

      expect(nextState.items).toHaveLength(2);
      expect(nextState.items[1].item).toBe("Second");
    });
  });

  describe("removeItem", () => {
    it("should remove an item by id", () => {
      const existing: { items: ListItem[] } = {
        items: [
          { id: 10, item: "Task" },
          { id: 20, item: "Another" },
        ],
      };
      const action = removeItem(10);
      const nextState = reducer(existing, action);

      expect(nextState.items).toHaveLength(1);
      expect(nextState.items.find((i) => i.id === 10)).toBeUndefined();
      expect(nextState.items[0].item).toBe("Another");
    });

    it("should leave state unchanged if id does not exist", () => {
      const existing: { items: ListItem[] } = {
        items: [{ id: 42, item: "Only" }],
      };
      const action = removeItem(99);
      const nextState = reducer(existing, action);

      expect(nextState).toEqual(existing);
    });

    it("should handle removing last item resulting in empty list", () => {
      const existing: { items: ListItem[] } = {
        items: [{ id: 5, item: "Solo" }],
      };
      const action = removeItem(5);
      const nextState = reducer(existing, action);

      expect(nextState.items).toHaveLength(0);
    });
  });
});
