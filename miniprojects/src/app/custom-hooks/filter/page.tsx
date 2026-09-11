import { useTextFilter } from "./components/useTextFilterComponent";
import { names } from "../../../../data/custom-hooks/filter/allMotorbikes";

export default function FilterMotorbikes() {
  const {
    searchText,
    setSearchText,
    filteredItems
  } = useTextFilter(names.map((motorbike) => motorbike.name));

  return (
    <div>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Filter..."
      />

      {filteredItems.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </div>
  );
}