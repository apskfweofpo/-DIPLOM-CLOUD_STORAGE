import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { awsConfig } from 'src/config/aws.config';
import { BUCKET_NAMES } from './constants/bucket-names';
import { FileInfo } from './interfaces/file-info';

@Injectable()
export class AWSService {
  private readonly s3: S3;

  constructor() {
    this.s3 = new S3(awsConfig);
  }

  async uploadSingleAccidentContent(file: Express.Multer.File): Promise<FileInfo> {
    const params: S3.PutObjectRequest = {
      Bucket: BUCKET_NAMES.ACCIDENT,
      Key: file.originalname,
      Body: file.buffer,
      ACL: 'public-read',
    };

    await this.s3.upload(params).promise();

    const fileInfo: FileInfo = {
      mimeType: file.mimetype,
      fileName: file.originalname,
      path: file.originalname,
    };

    return fileInfo;
  }
}
