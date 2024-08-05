import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';

import { AppService } from './app.service';

import { WarehouseModule } from './warehouse/warehouse.module';

import { Ingredient } from '@warehouse/infrastructure/entities/db/ingredient.entity';
import { Inventory } from '@warehouse/infrastructure/entities/db/inventory.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Ingredient, Inventory],
      synchronize: true,
    }),
    WarehouseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
