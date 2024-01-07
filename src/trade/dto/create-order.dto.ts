import { OrderSide } from '../model/order.interface';

export class CreateOrderDto {
  constructor(
    readonly symbol: string,
    readonly side: OrderSide,
    readonly quantity: number,
    readonly price: number,
  ) {}
}
