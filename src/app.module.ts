import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConfig, appConfig, databaseConfig } from './configs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { join } from 'path';
import { types } from 'pg';

// @UseGuards(AccessTokenGuard)
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, appConfig],
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV !== 'local',
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory(configService: ConfigService) {
        const dbConfig = configService.get<DatabaseConfig>('database');
        const options: PostgresConnectionOptions = {
          ...dbConfig,
          synchronize: true,
          migrationsRun: false,
          entities: [join(__dirname, '**/*.entity.{ts,js}')],
        };
        types.setTypeParser(types.builtins.INT8, (value) => {
          return value === null ? null : BigInt(value).toString();
        });
        return options;
      },
      inject: [ConfigService],
    }),
  ],
  // providers: [
  //   {
  //     provide: APP_GUARD,
  //     useClass: RolesGuard
  //   },
  //   Reflector
  // ]
})
export class AppModule {}
