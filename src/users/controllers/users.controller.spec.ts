import {Test, TestingModule} from '@nestjs/testing';
import {UsersController} from './users.controller';
import {UsersService} from "../service/users.service";
import {CreateUserDto} from "../dto/create-user.dto";
import {UpdateUserDto} from "../dto/update-user.dto";
import {userModelMockFactory} from "../test/unitTestMocks";

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
          {
            provide: UsersService,
            useFactory: userModelMockFactory
          }]
    }).compile();

    usersController = await module.get<UsersController>(UsersController);
    usersService = await module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });
  describe('findAll', () => {
    it('should get an array of users', async () => {
      await expect(usersController.findAll()).resolves.toEqual([
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
      ]);
    });
  });
  describe('findOne', () => {
    it('should get a single user', async () => {
      await expect(usersController.findOne(1)).resolves.toEqual({
        id: 1,
        name: 'Camilo',
        dob: '1988-01-01',
        address: 'Swieqi',
        description: 'Testing',
      });
    });
  });
  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Camilo',
        dob: new Date('1988-01-01'),
        address: 'Swieqi',
        description: 'Testing'
      };
      await expect(usersController.create(createUserDto)).resolves.toEqual({
        id: 1,
        ...createUserDto,
      });
    });
  });
  describe('update', () => {
    it('should update a new user', async () => {
      const updateUserDto: UpdateUserDto = {
        name: 'Camilo Updated',
        dob: new Date('1988-01-01'),
        address: 'Swieqi',
        description: 'Testing'
      };
      await expect(usersController.update(1, updateUserDto)).resolves.toEqual({
        id: 1,
        ...updateUserDto
      });
    });
  });
  describe('delete', () => {
    it('should return that it deleted a user', async () => {
      await expect(usersController.delete(1)).resolves.toEqual(
          {
            deleted: true,
          },
      );
    });
  });
});
