import { Wine } from "./Wine";
import { WineCategory } from "./WineCategory";

export const allWines: Wine[] = [
    {
        name: "Italian Red Wine",
        img: "/images/wines/italian-red.jpg",
        category: WineCategory.Red,
    },
    {
        name: "Chilean Dry White",
        img: "/images/wines/chilean-dry-white.jpg",
        category: WineCategory.White,
    },
    {
        name: "NZ Savignon Blanc",
        img: "/images/wines/nz-savignon-blanc.jpg",
        category: WineCategory.White,
    },
    {
        name: "Spanish Dry White",
        img: "/images/wines/spanish-dry-white.jpg",
        category: WineCategory.White,
    },
    {
        name: "Californian Chardonnay",
        img: "/images/wines/californian-chardonnay.jpg",
        category: WineCategory.White,
    },
    {
        name: "Pinot Noir Romania",
        img: "/images/wines/romania-pinot-noir.jpg",
        category: WineCategory.Red,
    },
    {
        name: "Vinho Verde Portugal",
        img: "/images/wines/portugal-vinho-verde.jpg",
        category: WineCategory.Green,
    }
];