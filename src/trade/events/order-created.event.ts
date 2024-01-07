import { IEvent } from '@nestjs/cqrs';
import { IOrder } from '../model/order.interface';
import { Logger } from '@nestjs/common';

export class OrderCreatedEvent implements IEvent {
  constructor(public readonly payload: IOrder) {
    Logger.debug(`OrderCreatedEvent: ${JSON.stringify(payload)}`);
  }
}
