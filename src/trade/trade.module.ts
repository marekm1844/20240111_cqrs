import { Module } from '@nestjs/common';
import { CreateOrderHandler } from './handlers/create-order.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { FirestoreClient } from './repositories/firestore-client';
import { OrderApiService } from './order-api.service';
import { ConfigService } from '@nestjs/config';
import { FirestoreEventStore } from './repositories/firestore-eventstore.repository';
import { OrderController } from './order.controller';
import { FillOrderHandler } from './handlers/fill-order.handler';
import { OrderSaga } from './sagas/order.saga';
import { CancelOrderHandler } from './handlers/cancel-order.handler';
import { GetOrderHandler } from './handlers/get-order.handler';

const commandHandlers = [
  CreateOrderHandler,
  FillOrderHandler,
  CancelOrderHandler,
];

@Module({
  imports: [CqrsModule],
  providers: [
    ...commandHandlers,
    FirestoreClient,
    OrderApiService,
    FirestoreEventStore,
    OrderSaga,
    GetOrderHandler,
    {
      provide: 'FIREBASE_ORDER_COLLECTION',
      useFactory: (configService: ConfigService) => {
        return configService.get<string>('FIREBASE_ORDER_COLLECTION');
      },
      inject: [ConfigService],
    },
    {
      provide: 'IEventStore',
      useClass: FirestoreEventStore,
    },
  ],
  controllers: [OrderController],
})
export class TradeModule {}
