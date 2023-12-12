import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async editUser(
    userId: number,
    dto: EditUserDto,
  ) {
    try {
      const user: User =
        await this.prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            ...dto,
          },
        });
      delete user.hash;
      return user;
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code == 'P2002') {
          throw new ForbiddenException(
            'Email already exists',
          );
        }
        throw Error(error.message);
      } else {
        throw Error(error.message);
      }
    }
  }
}
