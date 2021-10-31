import { product } from '.prisma/client';
import { ClientProxy } from '@nestjs/microservices';
import { ProductService } from './product.service';
export declare class ProductController {
    private readonly productService;
    private readonly client;
    constructor(productService: ProductService, client: ClientProxy);
    all(): Promise<Array<product>>;
    create(title: string, image: string): Promise<product>;
    get(id: number): Promise<product>;
    update(id: number, title: string, image: string): Promise<product>;
    delete(id: number): Promise<product>;
    like(id: number): Promise<product>;
}
