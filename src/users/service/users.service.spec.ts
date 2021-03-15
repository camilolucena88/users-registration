import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import {getRepositoryToken} from "@nestjs/typeorm";
import {User} from "../entity/User";
import {getCustomRepository, Repository} from "typeorm";
import {CreateUserDto} from "../dto/create-user.dto";
import {mockRepository} from "../test/mockRepository";
import {mocked} from "ts-jest";

const userArray = [
  {
    name: 'Camilo',
    dob: new Date('1988-01-01'),
    address: 'Swieqi',
    description: 'Testing'
  },
  {
    name: 'Joe',
    dob: new Date('1988-01-01'),
    address: 'Swieqi',
    description: 'Testing'
  },
  {
    name: 'Jean',
    dob: new Date('1988-01-01'),
    address: 'Swieqi',
    description: 'Testing'
  },
]


describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
          UsersService,
          {
            provide: getRepositoryToken(User),
            useClass: mockRepository,
          },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
