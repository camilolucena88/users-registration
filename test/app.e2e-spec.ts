import { Test, TestingModule } from '@nestjs/testing';
import {INestApplication, LoggerService} from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import {CreateUserDto} from "../src/users/dto/create-user.dto";
import assert from "assert";

class TestLogger implements LoggerService {
  log(message: string) {}
  error(message: string, trace: string) {}
  warn(message: string) {}
  debug(message: string) {}
  verbose(message: string) {}
}

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    app.useLogger(new TestLogger())
    await app.init()
  })

  afterAll(async () => {
    await Promise.all([
      app.close(),
    ])
  })

  describe('User creation', () => {
    it('/api/users (POST)', () => {
      return request(app.getHttpServer())
          .post('/api/users')
          .send({
            "name": "First Last",
            "dob": "1990-11-05",
            "address": "Dummy place",
            "description": "Dummy data"
          })
          .expect(201)
          .expect('Content-Type', /json/)
          .then(response => {
            assert(response.body.name, 'First Last')
          }).catch(error => console.log(error.message))
    })
    it('/api/users (GET_ALL)', () => {
      return request(app.getHttpServer())
          .get('/api/users')
          .expect(200)
    })

    it('/api/users/id (GET)', () => {
      return request(app.getHttpServer())
          .get('/api/users/20')
          .expect(200)
    })

    it('/api/users/id (PUT)', () => {
      return request(app.getHttpServer())
          .put('/api/users/20')
          .send({
            "name": "First Last",
            "dob": "1990-11-05",
            "address": "Dummy place",
            "description": "Dummy data"
          })
          .expect(200)
    })

    it('/api/users/id (DELETE)', () => {
      return request(app.getHttpServer())
          .delete('/api/users/20')
          .expect(200)
    })
  })
});
