import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from "../entity/User";
import {CreateUserDto} from "../dto/create-user.dto";
import {UpdateUserDto} from "../dto/update-user.dto";
import * as Http from "http";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
    ) {
    }

    findAll() {
        return this.userRepo.find();
    }

    async findOne(id: number) {
        return await this.userRepo.findOneOrFail({id}).catch((error) => {
                throw new HttpException(error.message, HttpStatus.NOT_FOUND)
            }
        );
    }

    async create(body: CreateUserDto) {
        return await this.userRepo.save(body).catch(error => {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        });
    }

    async update(id: number, body: UpdateUserDto) {
        const user = await this.userRepo.findOneOrFail(id);
        this.userRepo.merge(user, body);
        return await this.userRepo.save(user).catch(error => {
                throw new HttpException(error.message, HttpStatus.NOT_FOUND)
            });
    }

    async delete(id: number) {
        return await this.userRepo.delete(id).then(() => {
                return true
            }).catch(error => {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND)
        });
    }
}
