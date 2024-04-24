import { useWineContext } from "./wines-dropdown-context/wineContext/WineContext";

export default function FilteredWinesComponentThree() {
    const { wines } = useWineContext();

    return (
        <div className="total-wines-context">
            <p>Total number of wines is {wines.length}</p>
        </div>
    )
}