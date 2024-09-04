import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { provideHttpClient, HttpParams } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ApiBase } from '../models/enums';
import { Product } from '../models/interfaces';

const mockProducts: Product[] = [
  {
    id: 160,
    title: 'Samsung Galaxy Tab S8 Plus',
    description:
      "The Samsung Galaxy Tab S8 Plus in Grey is a high-performance Android tablet by Samsung. With a large AMOLED display, powerful processor, and S Pen support, it's ideal for productivity and entertainment.",
    category: 'tablets',
    price: 599.99,
    discountPercentage: 10,
    rating: 3.43,
    stock: 76,
    tags: ['electronics', 'tablets'],
    brand: 'Samsung',
    sku: '1SIVLPFN',
    weight: 10,
    dimensions: {
      width: 18.5,
      height: 24.49,
      depth: 10.45,
    },
    warrantyInformation: '6 months warranty',
    shippingInformation: 'Ships in 1-2 business days',
    availabilityStatus: 'In Stock',
    reviews: [
      {
        rating: 2,
        comment: 'Would not buy again!',
        date: '2024-05-23T08:56:21.626Z',
        reviewerName: 'Jackson Morales',
        reviewerEmail: 'jackson.morales@x.dummyjson.com',
      },
      {
        rating: 5,
        comment: 'Would buy again!',
        date: '2024-05-23T08:56:21.626Z',
        reviewerName: 'Cameron Perez',
        reviewerEmail: 'cameron.perez@x.dummyjson.com',
      },
      {
        rating: 5,
        comment: 'Fast shipping!',
        date: '2024-05-23T08:56:21.626Z',
        reviewerName: 'Nova Cooper',
        reviewerEmail: 'nova.cooper@x.dummyjson.com',
      },
    ],
    returnPolicy: '30 days return policy',
    minimumOrderQuantity: 1,
    meta: {
      createdAt: '2024-05-23T08:56:21.626Z',
      updatedAt: '2024-05-23T08:56:21.626Z',
      barcode: '7204800760083',
      qrCode: 'https://assets.dummyjson.com/public/qr-code.png',
    },
    images: [
      'https://cdn.dummyjson.com/products/images/tablets/Samsung%20Galaxy%20Tab%20S8%20Plus%20Grey/1.png',
      'https://cdn.dummyjson.com/products/images/tablets/Samsung%20Galaxy%20Tab%20S8%20Plus%20Grey/2.png',
      'https://cdn.dummyjson.com/products/images/tablets/Samsung%20Galaxy%20Tab%20S8%20Plus%20Grey/3.png',
      'https://cdn.dummyjson.com/products/images/tablets/Samsung%20Galaxy%20Tab%20S8%20Plus%20Grey/4.png',
    ],
    thumbnail:
      'https://cdn.dummyjson.com/products/images/tablets/Samsung%20Galaxy%20Tab%20S8%20Plus%20Grey/thumbnail.png',
  },
];

describe('ProductService', () => {
  let service: ProductService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ProductService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getAllProducts and return array of products', () => {
    service.getAllProducts().subscribe((res) => {
      if (res.state === 'loaded') {
        expect(res.data?.products).toEqual(mockProducts);
      }
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${ApiBase.ProductsOnJsonServer}?_page=1&_limit=30`,
    });

    req.flush(mockProducts);
  });

  it('should call getProductById and return the appropriate product', () => {
    const id = 160;

    service.getProductById(id).subscribe((res) => {
      if (res.state === 'loaded') {
        expect(res.data).toEqual(mockProducts[0]);
      }
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${ApiBase.ProductsOnJsonServer}/${id}`,
    });

    req.flush(mockProducts[0]);
  });

  it('should call addProduct and return the newly added product', () => {
    const newProduct = mockProducts[0];

    service.addProduct(newProduct).subscribe((res) => {
      if (res.state === 'loaded') {
        expect(res.data).toEqual(newProduct);
      }
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${ApiBase.ProductsOnJsonServer}`,
    });

    req.flush(newProduct);
  });

  it('should call updateProductData and return updated product', () => {
    const updatedProduct = { ...mockProducts[0], price: 549.99 };
    const id = updatedProduct.id;

    service.updateProductData(updatedProduct, id).subscribe((res) => {
      if (res.state === 'loaded') {
        expect(res.data).toEqual(updatedProduct);
      }
    });

    const req = httpController.expectOne({
      method: 'PATCH',
      url: `${ApiBase.ProductsOnJsonServer}/${id}`,
    });

    req.flush(updatedProduct);
  });
});
