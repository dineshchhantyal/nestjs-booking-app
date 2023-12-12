import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import {
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { AuthDto } from 'src/auth/dto';
import passport from 'passport';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.init();
    await app.listen(3000);

    prisma = app.get<PrismaService>(
      PrismaService,
    );

    await prisma.cleanDb();
    pactum.request.setBaseUrl(
      'http://localhost:3000',
    );
  });
  afterAll(() => {
    app.close();
  });
  describe('Auth', () => {
    const data: AuthDto = {
      email: 'test@gmail.com',
      password: 'test',
    };
    describe('Signup', () => {
      it('should throw if email is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ passport: data.password })
          .expectStatus(400)
          .inspect();
      });
      it('should throw if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ email: data.email })
          .expectStatus(400)
          .inspect();
      });

      it('should create a user', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(data)
          .expectStatus(201);
      });
    });
    describe('Signin', () => {
      const access_token = '';
      it('should throw if email is empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ passport: data.password })
          .expectStatus(400)
          .inspect();
      });
      it('should throw if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ email: data.email })
          .expectStatus(400)
          .inspect();
      });
      it('should signin a user', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(data)
          .expectStatus(200)
          .inspect()
          .stores('userAt', 'access_token');
      });
    });
  });
  describe('User', () => {
    describe('Get me', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            authorization: `Bearer $S{userAt}  `,
          })
          .expectStatus(200);
      });
    });
    describe('Edit user', () => {});
  });
  describe('Bookmarks', () => {
    describe('Create a bookmark', () => {});
    describe('Get all bookmarks', () => {});
    describe('Get bookmark by id', () => {});
    describe('Edit a bookmark', () => {});
    describe('Delete a bookmark', () => {});
  });
});
