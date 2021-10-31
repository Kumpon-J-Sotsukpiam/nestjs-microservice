import { HttpService } from '@nestjs/axios';
import { Controller, Param, Get, Post } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(
        private readonly productService: ProductService,
        private readonly httpService: HttpService
    ) { }

    @Get()
    all() {
        try {
            return this.productService.all()
        } catch (error) {
            console.log(error);

        }
    }
    @Post(':id/like')
    async like(@Param('id') id: number) {
        const product = await this.productService.findOne(id)
        this.httpService.post(`http://localhost:3000/product/${id}/like`, {}).subscribe(
            res => {
                console.log(res);
            }
        )
        return this.productService.update(id, {
            likes: product.likes + 1
        })
    }
    @EventPattern('product_created')
    async productCreated(product: any) {
        this.productService.create({
            id: product.id,
            title: product.title,
            image: product.image,
            likes: product.likes
        })
    }
    @EventPattern('product_updated')
    async productUpdated(product: any) {
        await this.productService.update(product.id, {
            id: product.id,
            title: product.title,
            image: product.image,
            likes: product.likes
        })
    }
    @EventPattern('product_deleted')
    async productDeleted(id: number) {
        await this.productService.delete(id)
    }
}
