import { Test, TestingModule } from '@nestjs/testing';
import { AddressService } from './address.service';
import {UsersService} from "./users.service";
import {HttpModule, HttpService} from "@nestjs/common";
import {AddressDto} from "../dto/address.dto";

describe('AddressService', () => {
  let service: AddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule,],
      providers: [
          AddressService,
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return an array of users', async () => {
    let address: AddressDto = {
      "type": "Point",
      "coordinates": [
        14.4419213796182,
        35.890522427978,
      ]
    }
    const location = await service.find("Malta");
    expect(location).toMatchObject<AddressDto>(address);
  });
});
