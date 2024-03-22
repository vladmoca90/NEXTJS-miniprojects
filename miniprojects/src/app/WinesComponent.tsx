"use client";
import "./styles/wines.css";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { MouseEvent, useCallback, useState } from "react";
import { Wine } from "../../data/wines/Wine";

export interface WinesProps {
    index: number;
    name: string;
    img: string;
    text: string;
    wine: Wine;
}

const close = <FontAwesomeIcon icon={faXmark} />

export default function WinesComponent(props: WinesProps) {
    const { wine } = props;
    const [closeWine, setCloseWine] = useState();

    const onCloseWine = useCallback((event: MouseEvent<HTMLDivElement>) => {
        const value = event.currentTarget.getAttribute("data-product");
        console.log(value);

        
    }, []);
    
    return (
        <div data-product={wine.name} className="product" key={wine.index}>
            <span onClick={onCloseWine} className="product-close">{close}</span>
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