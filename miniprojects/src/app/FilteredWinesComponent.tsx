import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Wine } from "../../data/wines/Wine";
import { useCallback } from "react";

export interface FilterWinesProps {
    wine: Wine;
    onDeletedWine: (wine: Wine) => void;
}

const closeIcon = <FontAwesomeIcon icon={faXmark} />;

export default function FilteredWinesComponent(props: FilterWinesProps) {
    const { wine, onDeletedWine } = props;

    // Callback to handle wine deletion
    const handleDeleteWine = useCallback(() => {
        onDeletedWine(wine);
    }, [onDeletedWine, wine]);

    return (
        <div className="product">
            <span onClick={handleDeleteWine} className="product-close">
                {closeIcon}
            </span>
            <div className="product-description__top">
                <p className="product-title">{wine.name}</p>
            </div>
            <div className="product-description__bottom">
                <Image
                    alt={wine.name}
                    className="product-img"
                    width={200}
                    height={100}
                    src={wine.img}
                />
            </div>
            <div className="wine-link">
                <Link 
                    href={{
                        pathname: "/wine-details",
                        query: { wineName: wine.name },
                    }}
                >
                    Check details
                </Link>
            </div>
        </div>
    );
}
