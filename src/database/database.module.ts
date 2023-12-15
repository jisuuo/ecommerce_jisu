import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    // TypeOrmModule.forRoot({
    //   type: 'pg',
    //   host: 'localhost',
    //   port: '5432',
    //   username: 'jisu',
    //   password: 'jisu',
    //   database: 'ecommerce_jisu',
    //   entities: [],
    //   autoLoadEntities: true,
    //   synchronize: true,
    // }),
  ],
})
export class DatabaseModule {}
