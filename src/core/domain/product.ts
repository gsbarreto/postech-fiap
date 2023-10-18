import Category from "./category";

export default interface Product {
    id: Number;
    name: string;
    description: string;
    price: Number;
    images: string[];
    category: Category;
}

