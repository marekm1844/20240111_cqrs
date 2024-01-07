import { Logger } from '@nestjs/common';
import { IEvent } from '@nestjs/cqrs';

export class OrderFilledEvent implements IEvent {
  constructor(readonly orderId) {
    Logger.debug(`OrderFilledEvent: ${orderId}`);
  }
}
