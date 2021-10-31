import { HttpService } from '@nestjs/axios';
import { ProductService } from './product.service';
export declare class ProductController {
    private readonly productService;
    private readonly httpService;
    constructor(productService: ProductService, httpService: HttpService);
    all(): Promise<import("./product.model").Product[]>;
    like(id: number): Promise<import("./product.model").Product>;
    productCreated(product: any): Promise<void>;
    productUpdated(product: any): Promise<void>;
    productDeleted(id: number): Promise<void>;
}
