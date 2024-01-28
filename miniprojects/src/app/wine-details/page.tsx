"use client";
import Image from "next/image";
import "./../styles/wines.css";

export default function WineDetails({ searchParams }: {
    searchParams: {
        "wineName": string,
    }
}) {

    let wineNameUrl = "http://localhost:3000/api/get-wine" + searchParams.wineName;

    return (
        <section className="box wine-details">
            <div className="products-container">
                <div className="product">
                    <div className="product-description__top">
                        <p className="product-title"></p>
                    </div>
                    <div className="product-description__bottom">
                        <Image alt="" className="product-img" width={200} height={100} src="" />
                    </div>
                </div>
            </div>
        </section>
    );

}