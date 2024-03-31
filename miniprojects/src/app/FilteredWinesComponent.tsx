import Image from "next/image";
import Link from "next/link";
import { Wine } from "../../data/wines/Wine";

export interface WinesProps {
    wine: Wine;
}

export default function FilteredWinesComponent(props: WinesProps) {
    return (
        <div className="product" key={props.wine.index}>
            <div className="product-description__top">
                <p className="product-title">{props.wine.name}</p>
            </div>
            <div className="product-description__bottom">
                <Image alt={props.wine.name} className="product-img" width={200} height={100} key={props.wine.index} src={props.wine.img} />
            </div>
            <div className="wine-link">
                <Link href={{
                    pathname: "/wine-details",
                    query: {
                        "wineName": props.wine.name,
                    }
                }}>Check details</Link>
            </div>
        </div>
    );
}