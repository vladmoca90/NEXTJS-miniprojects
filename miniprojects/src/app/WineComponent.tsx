"use client";
import "./styles/wines.css";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Wine } from "../../data/wines/Wine";
import { useCallback } from "react";

export interface WineProps {
    wine: Wine;
    onSelectedWine: (wine: Wine) => void;
}

const close = <FontAwesomeIcon icon={faXmark} />

export default function WineComponent(props: WineProps) {
    const { wine, onSelectedWine } = props;

    const getSelectedWine = useCallback(() => {
        const selectedWine: Wine = {
            index: wine.index,
            name: wine.name,
            img: wine.img,
            text: wine.text,
        }

        onSelectedWine(selectedWine);
    }, [onSelectedWine, wine.img, wine.index, wine.name, wine.text]);

    return (
        <div className="product">
            <span onClick={getSelectedWine} className="product-close">{close}</span>
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