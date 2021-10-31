import { Product, ProductDocument } from './product.model';
import { Model } from 'mongoose';
export declare class ProductService {
    private readonly productModel;
    constructor(productModel: Model<ProductDocument>);
    all(): Promise<Array<Product>>;
    findOne(id: number): Promise<Product>;
    create(data: any): Promise<Product>;
    update(id: number, data: any): Promise<Product>;
    delete(id: number): Promise<void>;
}
