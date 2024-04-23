import { useContext } from "react";
import { WineContext } from "./wines-dropdown-context/wineContext/WineContext";

export default function FilteredWinesComponentThree() {
    const { wines, setWines } = useContext(WineContext);

    return (
        <div>
            {wines.length}
        </div>
    )
}