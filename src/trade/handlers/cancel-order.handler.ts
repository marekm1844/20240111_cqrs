import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CancelOrderCommand } from '../commands/cancel-order.command';
import { OrderApiService } from '../order-api.service';
import { IEventStore } from '../repositories/event-store.interface';
import { Inject } from '@nestjs/common';
import { Order } from '../model/order.aggregate';

@CommandHandler(CancelOrderCommand)
export class CancelOrderHandler implements ICommandHandler<CancelOrderCommand> {
  constructor(
    private readonly orderService: OrderApiService,
    private readonly publisher: EventPublisher,
    @Inject('IEventStore') private readonly eventStore: IEventStore,
  ) {}

  async execute(command: CancelOrderCommand) {
    const result = await this.orderService.cancelOrder(command.payload.id);
    const orderDetails = {
      id: command.payload.id,
      status: result.status,
      symbol: command.payload.symbol,
    };
    await this.eventStore.save(orderDetails);
    let order = new Order(orderDetails.id);
    order.setData(orderDetails);
    order.cancelOrder();
    order = this.publisher.mergeObjectContext(order);
    order.commit();
  }
}
