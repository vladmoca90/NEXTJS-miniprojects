import { useMemo, useState } from "react";

export const useTextFilter = (items: string[]) => {
  const [searchText, setSearchText] = useState<string>("");

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [items, searchText]);

  return {
    searchText,
    setSearchText,
    filteredItems,
  };
};
