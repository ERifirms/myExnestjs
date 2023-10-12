import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UploadImage } from './config/upload';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/files')
  @UseInterceptors(FileInterceptor('file', UploadImage))
  handleUpload(@UploadedFile() file: Express.Multer.File) {
    console.log('file', file);
    return 'File Upload Api';
  }
}
