import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: Number(process.env.PORT) || 3000,
  baesApiBaseUrl: process.env.BAES_API_BASE_URL,
}));
