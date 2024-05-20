import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { DatabaseModule } from './database/database.module';
import { winstonConfig } from './config/winston.config';
import { AppConfigModule } from './config/app-config.module';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './core/auth/auth.module';
import { ProjectsModule } from './core/projects/projects.module';

@Module({
  imports: [
    AppConfigModule,
    MulterModule.register(),
    WinstonModule.forRoot(winstonConfig),
    DatabaseModule,
    AuthModule,
    ProjectsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
