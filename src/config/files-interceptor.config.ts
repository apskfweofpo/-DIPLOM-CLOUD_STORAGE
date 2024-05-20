import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { Request } from 'express';

export const FilesInterceptorConfig: [number, MulterOptions] = [
  10,
  {
    fileFilter: (
      req: Request,
      file: Express.Multer.File,
      callback: (error: Error, acceptFile: boolean) => void,
    ) => {
      const originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
      file.originalname = originalname;
      callback(null, true);
    },
  },
];
