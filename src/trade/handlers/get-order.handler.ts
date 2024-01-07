import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOrderQuery } from '../queries/get-order.query';
import { IEventStore } from '../repositories/event-store.interface';
import { Inject, Logger } from '@nestjs/common';

@QueryHandler(GetOrderQuery)
export class GetOrderHandler implements IQueryHandler<GetOrderQuery> {
  constructor(
    @Inject('IEventStore') private readonly eventStore: IEventStore,
  ) {}

  async execute(query: GetOrderQuery) {
    const order = await this.eventStore.getEventsForOrder(query.orderId);
    Logger.debug(`GetOrderHandler: ${JSON.stringify(order)}`);
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  }
}
