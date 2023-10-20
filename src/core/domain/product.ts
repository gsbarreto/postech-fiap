import Category from "./category";

export default class Product {
  id: string | null = null;
  constructor(
    id: string | null,
    readonly name: string,
    readonly description: string,
    readonly price: Number,
    readonly images: string[],
    readonly category: Category
  ) {
    this.id = id;
  }

  setID = (id: string) => {
    this.id = id;
  };
}
