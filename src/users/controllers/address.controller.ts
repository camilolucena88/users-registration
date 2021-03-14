import {Controller, Get, Param} from '@nestjs/common';
import {AddressService} from "../service/address.service";
import {UsersService} from "../service/users.service";

@Controller('api')
export class AddressController {
    constructor(
        private addressService: AddressService,
        private usersService: UsersService
    ) {
    }

    @Get('/users/:id/address')
    async findOne(@Param('id') id: number) {
        return await this.usersService.findOne(id).then( (user) => {
            return this.addressService.find(user.address)
        })
    }
}
