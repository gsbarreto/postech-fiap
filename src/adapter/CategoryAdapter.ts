import Category from "../core/entity/category";

export default class CategoryAdapter {
  static create(categoryName: String) {
    const categoryNameValue = Category[categoryName as keyof typeof Category];
    if (!categoryNameValue) throw new Error("Invalid category!");
    return categoryNameValue;
  }
}
