import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateOrderCommand } from '../commands/create-order.command';
import { OrderApiService } from '../order-api.service';
import { Inject } from '@nestjs/common';
import { IEventStore } from '../repositories/event-store.interface';
import { Order } from '../model/order.aggregate';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(
    private readonly orderApi: OrderApiService,
    private readonly publisher: EventPublisher,
    @Inject('IEventStore') private readonly eventStore: IEventStore,
  ) {}

  async execute(command: CreateOrderCommand) {
    const orderDetails = await this.orderApi.createOrder(
      command.createOrderDto,
    );

    await this.eventStore.save(orderDetails);

    let order = new Order(undefined);
    order.setData(orderDetails);
    order.createOrder();

    order = this.publisher.mergeObjectContext(order);

    order.commit();
  }
}
