import { BUCKET_NAMES } from 'src/aws/constants/bucket-names';

export class PathTransformer {
  static transformAccidentContentPath(path: string): string {
    const transformedPath: string = `${process.env.S3_BAES_URL}/${BUCKET_NAMES.ACCIDENT}/${path}`;

    return transformedPath;
  }

  static transformIconPath(path: string): string {
    const transformedPath: string = `${process.env.S3_BAES_URL}/${BUCKET_NAMES.ICON}/${path}`;

    return transformedPath;
  }
}
