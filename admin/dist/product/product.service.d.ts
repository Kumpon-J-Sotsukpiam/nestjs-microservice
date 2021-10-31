import { product } from '.prisma/client';
import { PrismaService } from '../prisma/prisma.service';
export declare class ProductService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    all(): Promise<Array<product>>;
    create(data: any): Promise<product>;
    get(id: number): Promise<product>;
    update(id: number, data: any): Promise<product>;
    delete(id: number): Promise<product>;
}
