import { ICommand } from '@nestjs/cqrs';
import { FillOrderDto } from '../dto/fill-order.dto';

export class FillOrderCommand implements ICommand {
  constructor(readonly payload: FillOrderDto) {}
}
