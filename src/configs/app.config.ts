import { registerAs } from '@nestjs/config';

export default registerAs('app', () => {
  const returtObj = {
    apiPort: Number(process.env.API_PORT),
    nsiUrl: process.env.NSI_URL,
    clientSubjectUrl: process.env.CLIENT_SUBJECT_URL,
  };
  return returtObj;
});
