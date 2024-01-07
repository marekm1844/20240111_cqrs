import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { OrderApiService } from '../order-api.service';
import { Inject } from '@nestjs/common';
import { IEventStore } from '../repositories/event-store.interface';
import { FillOrderCommand } from '../commands/fill-order.command';
import { IOrder } from '../model/order.interface';
import { Order } from '../model/order.aggregate';

@CommandHandler(FillOrderCommand)
export class FillOrderHandler implements ICommandHandler<FillOrderCommand> {
  constructor(
    private readonly orderApi: OrderApiService,
    private readonly publisher: EventPublisher,
    @Inject('IEventStore') private readonly eventStore: IEventStore,
  ) {}

  async execute(command: FillOrderCommand) {
    const result = await this.orderApi.fillOrder(command.payload.id);
    const orderDetails: Partial<IOrder> = {
      id: command.payload.id,
      status: result.status,
      symbol: command.payload.symbol,
    };

    await this.eventStore.save(orderDetails);

    let order = new Order(orderDetails.id);
    order.setData(orderDetails);
    order.fillOrder();

    order = this.publisher.mergeObjectContext(order);

    order.commit();
  }
}
