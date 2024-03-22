"use client";
import "./styles/wines.css";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export type WinesProps = {
    index: number,
    name: string,
    img: string,
    text: string,
}

const close = <FontAwesomeIcon icon={faXmark} />

export const Wines = (props: WinesProps) => {
    return (
        <div className="product" key={props.index}>
            <span className="product-close">{close}</span>
            <div className="product-description__top">
                <p className="product-title">{props.name}</p>
            </div>
            <div className="product-description__bottom">
                <Image alt={props.name} className="product-img" width={200} height={100} key={props.index} src={props.img} />
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