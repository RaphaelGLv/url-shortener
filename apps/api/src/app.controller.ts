import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectConnection() private readonly connection: Connection
  ) {}

  @Get('health-check')
  getHealthCheck() {
    return {
      status: 'UP',
      db: this.connection.readyState === 1 ? 'UP' : 'DOWN'
    };
  }
}
