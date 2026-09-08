import { useTextFilter } from "./components/useTextFilterComponent";
import { names } from "../../../../data/custom-hooks/filter/allMotorbikes";

export default function SearchMotorbikes() {
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
        placeholder="Search..."
      />

      {filteredItems.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </div>
  );
}