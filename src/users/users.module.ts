import {HttpModule, HttpService, Module} from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UsersController } from './controllers/users.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entity/User";
import { AddressService } from './service/address.service';
import { AddressController } from './controllers/address.controller';

@Module({
  imports: [
      TypeOrmModule.forFeature([User]),
      HttpModule
  ],
  providers: [UsersService, AddressService],
  controllers: [UsersController, AddressController],
  exports: [TypeOrmModule]
})
export class UsersModule {}
