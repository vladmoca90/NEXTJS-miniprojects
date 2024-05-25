import Image from "next/image";
import Link from "next/link";
import { Wine } from "../../data/wines/Wine";

export interface WineProps {
    wine: Wine;
}

export default function FilteredWinesComponent(props: WineProps) {
    const { wine } = props;

    return (
        <div className="product" key={wine.index}>
            <div className="product-description__top">
                <p className="product-title">{wine.name}</p>
            </div>
            <div className="product-description__bottom">
                <Image alt={wine.name} className="product-img" width={200} height={100} key={wine.index} src={wine.img} />
            </div>
            <div className="wine-link">
                <Link href={{
                    pathname: "/wine-details",
                    query: {
                        "wineName": wine.name,
                    }
                }}>Check details</Link>
            </div>
        </div>
    );
}