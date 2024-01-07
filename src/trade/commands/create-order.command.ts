import { ICommand } from '@nestjs/cqrs';
import { CreateOrderDto } from '../dto/create-order.dto';

export class CreateOrderCommand implements ICommand {
  constructor(public readonly createOrderDto: CreateOrderDto) {}
}
