import { IOrder } from '../model/order.interface';

export enum OrderEventType {
  CREATED = 'OrderCreated',
  CANCELLED = 'OrderCancelled',
  FILLED = 'OrderFilled',
}

export interface IOrderEventMetadata {
  eventId: string;
  aggregateId: string;
  sequenceNumber: number;
  createdAt: Date;
  version: number;
  correlationId?: string;
  causationId?: string;
}

export interface IOrderEvent {
  eventType: OrderEventType;
  payload: Partial<IOrder>;
}
