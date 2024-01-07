import { Module } from '@nestjs/common';
import { TradeModule } from './trade/trade.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TradeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
