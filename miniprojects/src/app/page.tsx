import { NavbarComponent } from "./counter-redux2/NavbarComponent";
import { StoreComponent } from "./counter-redux2/store/StoreComponent";

export default function Counter() {
    return (
        <>
            <NavbarComponent />
            <StoreComponent />
        </>
    );
}