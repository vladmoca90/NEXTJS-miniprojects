import { useTextFilter } from "./components/useTextFilterComponent";

const names = ["Honda", "Yamaha", "Ducati", "Kawasaki"];

export default function SearchMotorbikes() {
  const {
    searchText,
    setSearchText,
    filteredItems
  } = useTextFilter(names);

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