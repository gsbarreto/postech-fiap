import Category from "./category";

export default interface Product {
    name: string;
    description: string;
    price: Number;
    images: string[];
    category: Category;
}

