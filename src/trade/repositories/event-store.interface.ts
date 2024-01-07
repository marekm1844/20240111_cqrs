import { Order } from '../model/order.aggregate';
import { IOrder } from '../model/order.interface';

export interface IEventStore {
  save(order: Partial<IOrder>): Promise<void>;
  getEventsForOrder(orderId: string): Promise<Order | null>;
}
