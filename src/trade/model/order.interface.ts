export enum OrderSide {
  BUY = 'BUY',
  SELL = 'SELL',
}

export enum OrderStatus {
  OPEN = 'OPEN',
  FILLED = 'FILLED',
  CANCELED = 'CANCELED',
}

export interface IOrder {
  id: string;
  symbol: string;
  side: OrderSide;
  status: OrderStatus;
  quantity: number;
  price: number;
  timestamp: number;
}
