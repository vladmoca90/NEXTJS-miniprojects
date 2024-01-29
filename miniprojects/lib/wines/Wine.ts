import { WineCategory } from "./WineCategory";

export interface Wine {
    category: WineCategory;
    name: string;
    img: string;
    text: string;
}