import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { IOrder, OrderSide, OrderStatus } from './model/order.interface';

@Injectable()
export class OrderApiService {
  async createOrder(order: CreateOrderDto): Promise<IOrder> {
    const mockOrder: IOrder = {
      id: Math.floor(1000 + Math.random() * 9000).toString(),
      symbol: 'RUNEBUSD',
      side: OrderSide.BUY, // or OrderSide.SELL depending on the order
      status: OrderStatus.OPEN,
      quantity: order.quantity, // replace with a valid quantity
      price: order.price, // replace with a valid price
      timestamp: Date.now(), // replace with a valid timestamp
    };

    return mockOrder;
  }

  async fillOrder(
    orderId: string,
  ): Promise<{ id: string; status: OrderStatus }> {
    return { id: orderId, status: OrderStatus.FILLED };
  }

  async cancelOrder(
    orderId: string,
  ): Promise<{ id: string; status: OrderStatus }> {
    return { id: orderId, status: OrderStatus.CANCELED };
  }
}
