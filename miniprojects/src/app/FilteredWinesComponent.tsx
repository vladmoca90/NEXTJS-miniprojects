import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Wine } from "../../data/wines/Wine";
import { useCallback, useState } from "react";
import { useWineContext } from "./wines-dropdown/wineContext/WineContext";

const close = <FontAwesomeIcon icon={faXmark} />

export default function FilteredWinesComponent() {
    const useWine = useWineContext();
    const { wine, onDeletedWine } = useState<Wine>("");

    const getDeletedWine = useCallback(() => {
        onDeletedWine(wine);
    }, [onDeletedWine, wine]);

    return (
        <div className="product">
            <span onClick={getDeletedWine} className="product-close">{close}</span>
            <div className="product-description__top">
                <p className="product-title">{useWine.name}</p>
            </div>
            <div className="product-description__bottom">
                <Image alt={useWine.name} className="product-img" width={200} height={100} key={useWine.index} src={useWine.img} />
            </div>
            <div className="wine-link">
                <Link href={{
                    pathname: "/wine-details",
                    query: {
                        "wineName": useWine.name,
                    }
                }}>Check details</Link>
            </div>
        </div>
    );
}