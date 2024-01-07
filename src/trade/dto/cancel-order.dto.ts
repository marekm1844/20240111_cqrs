export class CancelOrderDto {
  constructor(
    readonly id: string,
    readonly symbol: string,
  ) {}
}
