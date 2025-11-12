import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmployeesModule } from './employers/employers.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true}),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true, 
      }),
      inject: [ConfigService],
    }),
    EmployeesModule,
    (DashboardModule, ReportsModule)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
