import { ICommand } from '@nestjs/cqrs';
import { CancelOrderDto } from '../dto/cancel-order.dto';

export class CancelOrderCommand implements ICommand {
  constructor(readonly payload: CancelOrderDto) {}
}
