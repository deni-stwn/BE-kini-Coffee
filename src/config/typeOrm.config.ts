import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'db_kinicoffee',
    // entities: [Product],
    entities: [__dirname + '/../**/*.entity.{ts,js}'],
    autoLoadEntities: true,
    synchronize: false
}

