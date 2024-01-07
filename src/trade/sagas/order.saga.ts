import { Injectable } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable, map } from 'rxjs';
import { IOrderEvent } from '../events/order-events.interface';
import { OrderCreatedEvent } from '../events/order-created.event';
import { FillOrderCommand } from '../commands/fill-order.command';
import { FillOrderDto } from '../dto/fill-order.dto';

@Injectable()
export class OrderSaga {
  @Saga()
  orderCreated = (events$: Observable<IOrderEvent>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrderCreatedEvent),
      map((event: OrderCreatedEvent) => {
        return new FillOrderCommand(
          new FillOrderDto(event.payload.id, event.payload.symbol),
        );
      }),
    );
  };
}
