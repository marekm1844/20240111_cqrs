import { Controller, Post, Body, HttpCode, Get, Param } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreateOrderCommand } from './commands/create-order.command';
import { CancelOrderDto } from './dto/cancel-order.dto';
import { CancelOrderCommand } from './commands/cancel-order.command';
import { GetOrderQuery } from './queries/get-order.query';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    const command = new CreateOrderCommand(createOrderDto);
    await this.commandBus.execute(command);
    return { message: 'Order created' };
  }

  @Post('cancel')
  @HttpCode(200)
  async cancelOrder(@Body() cancelOrderDto: CancelOrderDto) {
    const command = new CancelOrderCommand(cancelOrderDto);
    await this.commandBus.execute(command);
    return { message: 'Order cancelled' };
  }

  @Get(':id')
  async getOrder(@Param('id') id: string) {
    const query = new GetOrderQuery(id);
    return await this.queryBus.execute(query);
  }
}
