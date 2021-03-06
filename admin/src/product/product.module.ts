import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices'

import { PrismaModule } from '../prisma/prisma.module'

import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [PrismaModule,
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'main_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ])],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule { }
