import {CreateUserDto} from "../dto/create-user.dto";
import {UpdateUserDto} from "../dto/update-user.dto";

export const userModelMockFactory = () => ({
    findAll: jest.fn().mockResolvedValue([
        {name: 'Camilo', dob: '1988-01-01', address: 'Swieqi', description: 'Testing'},
        {name: 'Joe', dob: '1988-01-01', address: 'Swieqi', description: 'Testing'},
        {name: 'Jean', dob: '1988-01-01', address: 'Swieqi', description: 'Testing'},
    ]),
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
    create: jest.fn().mockImplementation(
        (createUserDto: CreateUserDto) =>
            Promise.resolve({
                id: 1,
                ...createUserDto
            }),
    ),
    update: jest.fn().mockImplementation(
        (updateUserDto: UpdateUserDto) =>
            Promise.resolve({
                id: 1,
                name: 'Camilo Updated',
                dob: new Date('1988-01-01'),
                address: 'Swieqi',
                description: 'Testing',
            }),
    ),
    delete: jest.fn().mockResolvedValue({deleted: true}),
})