// import { TypeOrmModuleOptions } from "@nestjs/typeorm";

// export const typeOrmConfig: TypeOrmModuleOptions = {
//     type: 'mysql',
//     host: 'localhost',
//     port: 3306,
//     username: 'root',
//     password: 'root',
//     database: 'db_kinicoffee',
//     // entities: [Product],
//     entities: [__dirname + '/../**/*.entity.{ts,js}'],
//     autoLoadEntities: true,
//     synchronize: false
// }

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: 3306,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  // entities: [Product],
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  autoLoadEntities: true,
  synchronize: false,
};
