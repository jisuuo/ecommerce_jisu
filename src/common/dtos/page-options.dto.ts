import { Order } from '../constraints/order.contraint';

export class PageOptionsDto {
  readonly order: Order = Order.ASC;

  readonly page: number = 1;

  readonly take: number = 10;

  readonly title?: string;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
