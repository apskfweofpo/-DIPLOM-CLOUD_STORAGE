import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { DatabaseModule } from './database/database.module';
import { winstonConfig } from './config/winston.config';
import { AppConfigModule } from './config/app-config.module';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './core/auth/auth.module';
import { ProjectsModule } from './core/projects/projects.module';
import { FilesModule } from './core/files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import path from 'path';

@Module({
  imports: [
    AppConfigModule,
    MulterModule.register(),
    WinstonModule.forRoot(winstonConfig),
    DatabaseModule,
    AuthModule,
    ProjectsModule,
    FilesModule,
    ServeStaticModule.forRoot({
      rootPath: path.resolve( __dirname, 'static'),
  }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
