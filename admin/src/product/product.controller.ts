import { product } from '.prisma/client';
import { Body, Controller, Delete, Get, Param, Post, Put, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(
        private readonly productService: ProductService,
        @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy
    ) { }

    @Get()
    all(): Promise<Array<product>> {
        this.client.emit('hello', 'Hello from RabbitMQ');
        return this.productService.all()
    }
    @Post()
    async create(
        @Body('title') title: string,
        @Body('image') image: string
    ): Promise<product> {
        const product = await this.productService.create({
            title, image
        })
        this.client.emit('product_created', product)
        return product
    }
    @Get(':id')
    get(@Param('id') id: number): Promise<product> {
        return this.productService.get(id)
    }
    @Put(":id")
    async update(
        @Param('id') id: number,
        @Body('title') title: string,
        @Body('image') image: string
    ): Promise<product> {
        const product = await this.productService.update(id, { title, image })
        this.client.emit('product_updated', product)
        return product
    }
    @Delete(":id")
    async delete(
        @Param('id') id: number
    ): Promise<product> {
        const product = await this.productService.delete(id)
        this.client.emit('product_deleted', id)
        return product
    }
    @Post(':id/like')
    async like(@Param('id') id: number) {
        const product = await this.productService.get(id)
        return await this.productService.update(id, {
            likes: product.likes + 1
        })
    }
}
