export enum ApiBase {
  Products = 'https://dummyjson.com/products',
}

export enum ProductEndpoints {
  Search = `${ApiBase.Products}/search`,
  CategoryList = `${ApiBase.Products}/category-list`,
  Category = `${ApiBase.Products}/category`,
}

export enum StorageKeys {
  CartItems = 'cart-items',
}
