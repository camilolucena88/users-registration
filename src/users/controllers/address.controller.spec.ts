import {Test, TestingModule} from '@nestjs/testing';
import {AddressController} from './address.controller';
import {UsersService} from "../service/users.service";
import {AddressService} from "../service/address.service";
import {HttpModule} from "@nestjs/common";
import {AddressDto} from "../dto/address.dto";

describe('AddressController', () => {
  let controller: AddressController;
  let usersService: UsersService;
  let addressService: AddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [
        AddressController
      ],
      providers: [
        AddressService,
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn().mockImplementation(
                (id: number) =>
                    Promise.resolve({
                      name: 'Camilo',
                      dob: '1988-01-01',
                      address: 'Swieqi',
                      description: 'Testing',
                      id
                    }),
            ),
          }
        }
      ]
    }).compile();

    controller = module.get<AddressController>(AddressController);
    usersService = await module.get<UsersService>(UsersService);
    addressService = await module.get<AddressService>(AddressService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    let address: AddressDto = {"coordinates": [14.48, 35.92083], "type": "Point"}
    it('should get an array of users', async () => {
      await expect(controller.findOne(15)).resolves.toEqual(address)
    })
  })
});
