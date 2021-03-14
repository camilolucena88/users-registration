import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import {getRepositoryToken} from "@nestjs/typeorm";
import {User} from "../entity/User";
import {Repository} from "typeorm";

const userArray = [
  {
    name: 'Camilo',
    dob: '1988-01-01',
    address: 'Swieqi',
    description: 'Testing'
  },
  {
    name: 'Joe',
    dob: '1988-01-01',
    address: 'Swieqi',
    description: 'Testing'
  },
  {
    name: 'Jean',
    dob: '1988-01-01',
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
            useClass: Repository,
          },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

    it('should return an array of users', async () => {
      const users = await service.findAll();
      expect(users).toEqual(userArray);
    });
});
