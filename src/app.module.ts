import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmployeesModule } from './employers/employers.module';
// Інші ваші імпорти...

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Налаштування конфігурації
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        // --- ОСНОВНА ЗМІНА ТУТ ---
        // Видаляємо явне перерахування entities.
        // autoLoadEntities: true змусить TypeORM автоматично
        // знаходити всі ваші сутності, зареєстровані через forFeature.
        autoLoadEntities: true,
        synchronize: true, // Увага: використовуйте true тільки для розробки
      }),
      inject: [ConfigService],
    }),
    // Тепер AppModule просто імпортує інші модулі
    EmployeesModule,
    // ... інші ваші модулі (DashboardModule, ReportsModule)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
