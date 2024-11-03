import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Wine } from "../../data/wines/Wine";
import { useCallback, FC } from "react";
import FilteredWinesComponentTwo from "./FilteredWinesComponentTwo";

export interface WineProps {
    wine: Wine;
    onDeletedWine: (wine: Wine) => void;
}

const closeIcon = <FontAwesomeIcon icon={faXmark} />;

const FilteredWinesComponent: FC<WineProps> = ({ wine, onDeletedWine }) => {
    const handleDelete = useCallback(() => {
        onDeletedWine(wine);
    }, [onDeletedWine, wine]);

    return (
        <div className="product">
            <span onClick={handleDelete} className="product-close">{closeIcon}</span>
            <div className="product-description__top">
                <p className="product-title">{wine.name}</p>
            </div>
            <div className="product-description__bottom">
                {wine.img && (
                    <Image
                        alt={wine.name}
                        className="product-img"
                        width={200}
                        height={100}
                        key={wine.index}
                        src={wine.img}
                    />
                )}
            </div>
            <div className="wine-link">
                <Link
                    href={{
                        pathname: "/wine-details",
                        query: { wineName: wine.name }
                    }}
                >
                    Check details
                </Link>
            </div>
            <FilteredWinesComponentTwo />
        </div>
    );
};

export default FilteredWinesComponent;
