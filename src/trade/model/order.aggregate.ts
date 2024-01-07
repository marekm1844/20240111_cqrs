import { AggregateRoot } from '@nestjs/cqrs';
import { IOrder, OrderStatus } from './order.interface';
import { OrderCreatedEvent } from '../events/order-created.event';
import { IOrderEvent } from '../events/order-events.interface';
import { OrderFilledEvent } from '../events/order-filled.event';
import { OrderCancelledEvent } from '../events/order-cancelled.event';

export class Order extends AggregateRoot {
  private _order: Partial<IOrder>;

  constructor(private readonly id: string | undefined) {
    super();
  }

  setData(order: Partial<IOrder>) {
    this._order = order;
  }

  createOrder() {
    if (this._order.status !== OrderStatus.OPEN) {
      throw new Error('Order is not open');
    }
    this.apply(new OrderCreatedEvent(this._order as IOrder));
  }

  fillOrder() {
    this.apply(new OrderFilledEvent(this._order.id));
  }

  cancelOrder() {
    this.apply(new OrderCancelledEvent(this._order.id));
  }
  static fromEvents(events: IOrderEvent[]): Order {
    const order = new Order(undefined);
    events.forEach((event) => {
      order.setData({ ...order._order, ...event.payload });
      order.apply(event.payload, true);
    });
    return order;
  }
}
