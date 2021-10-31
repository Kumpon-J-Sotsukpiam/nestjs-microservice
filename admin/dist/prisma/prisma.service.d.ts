import { PrismaClient } from '@prisma/client';
import { INestApplication, OnModuleInit } from '@nestjs/common';
export declare class PrismaService extends PrismaClient implements OnModuleInit {
    onModuleInit(): Promise<void>;
    enableShutdownHooks(app: INestApplication): Promise<void>;
}
