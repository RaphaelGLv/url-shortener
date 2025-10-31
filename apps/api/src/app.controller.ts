import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Public } from './decorators/public.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectConnection() private readonly connection: Connection
  ) {}

  @Public()
  @Get('health-check')
  getHealthCheck() {
    return {
      status: 'UP',
      db: this.connection.readyState === 1 ? 'UP' : 'DOWN'
    };
  }
}
