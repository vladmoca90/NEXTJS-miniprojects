// FilteredWinesComponentThree.tsx
import { useContext } from "react";
import { WineContext } from "./wines-dropdown-context/wineContext/WineContext";

export default function FilteredWinesComponentThree() {
  const { wines } = useContext(WineContext);

  return (
    <div className="total-wines-context">
      <p>Total number of wines is {wines.length}</p>
      {wines.length > 2 && <p>{wines[2].name}</p>}
      {wines.length > 3 && <p>{wines[3].name}</p>}
    </div>
  );
}
