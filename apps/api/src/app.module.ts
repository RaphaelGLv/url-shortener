import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { UrlModule } from "./url/url.module";
import { CounterModule } from "./url-counter/counter.module";
import { AuthGuard } from "./auth/auth.guard";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
      expandVariables: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const dbUrl = configService.get<string>("DATABASE_URL");
        if (!dbUrl) {
          throw new Error("FATAL: DATABASE_URL not defined in .env file");
        }

        return {
          uri: dbUrl,
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UrlModule,
    CounterModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService, { provide: 'APP_GUARD', useClass: AuthGuard }],
})
export class AppModule {}
