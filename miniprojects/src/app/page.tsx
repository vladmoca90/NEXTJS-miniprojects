"use client";
import "./styles/shop.css";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

export default function ShopProducts() {
    const shopUrl = "http://localhost:3000/api/shop";

    const getShop = useCallback(async () => {
        const res = await fetch(shopUrl);

        if (!res.ok) {
            throw new Error("The details are NOT valid!");
        } else {
            console.log("The details are valid!");
        }

        const data = await res.json();
    }, []);

    return (
        <section className="box"></section>
    );
}