import { Injectable } from '@nestjs/common';
import {
  CreateBookmarkDto,
  EditBookmarkDto,
} from './dto';

@Injectable()
export class BookmarkService {
  createBookmark(
    userId: number,
    dto: CreateBookmarkDto,
  ) {}
  getBookmarks(userId: number) {}

  getBookmarkById(
    userId: number,
    bookmarkId: number,
  ) {}

  editBookmarkById(
    userId: number,
    bookmarkId: number,
    dto: EditBookmarkDto,
  ) {}

  deleteBookmarkById(
    userId: number,
    bookmarkId: number,
  ) {}
}
