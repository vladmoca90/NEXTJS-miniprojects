import Link from "next/link";
import "./styles/wines.css";

export type WinesProps = {
    index: number,
    name: string,
    img: string,
    text: string,
}

export const Wines = (props: WinesProps) => {
    return (
        <div className="product" key={props.index}>
            <div className="product-description__top">
                <p className="product-title">{props.name}</p>
            </div>
            <div className="product-description__bottom">
                <img alt={props.name} className="product-img" width={200} height={100} key={props.index} src={props.img} />
            </div>
            <div className="wine-link">
                <Link href={{
                    pathname: "/wine-details",
                    query: {
                        "wineName": props.name,
                    }
                }}>Check details</Link>
            </div>
        </div>
    );
}