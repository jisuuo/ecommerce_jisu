import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';

@Entity()
export class Product extends BaseEntity {
  @Column()
  public name: string;

  @Column()
  public desc: string;

  @Column({
    default: 0,
  })
  public price?: number;

  @Column({
    default: true,
  })
  public onSales?: boolean;
}
