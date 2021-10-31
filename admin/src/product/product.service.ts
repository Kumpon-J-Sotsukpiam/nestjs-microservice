import { product } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class ProductService {
    constructor(
        private readonly prismaService: PrismaService
    ) { }

    async all(): Promise<Array<product>> {
        return this.prismaService.product.findMany({})
    }
    async create(data): Promise<product> {
        return this.prismaService.product.create({ data })
    }
    async get(id: number): Promise<product> {
        return this.prismaService.product.findUnique({
            where: { id: Number(id) }
        })
    }
    async update(id: number, data): Promise<product> {
        let res = await this.prismaService.product.update({
            where: { id: Number(id) }, data
        })
        return res
    }
    async delete(id: number): Promise<product> {
        return this.prismaService.product.delete({
            where: { id: Number(id) }
        })
    }
}
