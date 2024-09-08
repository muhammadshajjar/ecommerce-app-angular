export enum ApiBase {
  Products = 'https://dummyjson.com/products',
  ProductsOnJsonServer = 'http://localhost:3000/products',
  CategoriesOnJsonServer = 'http://localhost:3000/categories',
}

export enum ProductEndpoints {
  Search = `${ApiBase.Products}/search`,
  CategoryList = `${ApiBase.Products}/category-list`,
  Category = `${ApiBase.Products}/category`,
}
export enum StorageKeys {
  CartItems = 'cart-items',
}
