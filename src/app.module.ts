import {HttpModule, HttpService, Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from '@nestjs/config';
import { UsersModule } from './users/users.module';
import {User} from "./users/entity/User";
import {UsersController} from "./users/controllers/users.controller";
import {UsersService} from "./users/service/users.service";
import {AddressController} from "./users/controllers/address.controller";
import {AddressService} from "./users/service/address.service";


@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.development.env',
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: parseInt(process.env.POSTGRES_PORT) || 5432,
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DATABASE,
            entities: [User],
            synchronize: false,
            retryDelay: 3000,
            retryAttempts: 10
        }),
        UsersModule,
        HttpModule
    ],
    controllers: [UsersController, AddressController],
    providers: [
        UsersService,
        AddressService
    ]
})
export class AppModule {
}
