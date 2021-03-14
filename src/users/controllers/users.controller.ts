import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {UsersService} from "../service/users.service";
import {CreateUserDto} from "../dto/create-user.dto";
import {UpdateUserDto} from "../dto/update-user.dto";

@Controller('api/users')
export class UsersController {
    constructor(private usersService: UsersService) {}
    
    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return await this.usersService.findOne(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    create(@Body() createUserDto: CreateUserDto) {
        try {
            return this.usersService.create(createUserDto);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
            return this.usersService.update(id, updateUserDto).catch(error => {
                throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);    
            });
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.usersService.delete(id).catch(error => {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
}
