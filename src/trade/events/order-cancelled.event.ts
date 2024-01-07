import { Logger } from '@nestjs/common';

export class OrderCancelledEvent {
  constructor(private readonly orderId: string) {
    Logger.debug(`OrderCancelledEvent: ${orderId}`);
  }
}
