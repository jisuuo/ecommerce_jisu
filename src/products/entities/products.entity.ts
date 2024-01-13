import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { GenderEnum } from '../../enum/gender.enum';
import { Reviews } from '../../reviews/entities/reviews.entity';
import { Prices } from '../../prices/entities/prices.entity';
import { User } from '../../user/entities/user.entity';
@Entity()
export class Products extends BaseEntity {
  @Column()
  public productName: string;

  @Column()
  public brand: string;

  @Column()
  public productCode: string;

  @Column()
  public season: string;

  @Column({
    type: 'enum',
    enum: GenderEnum,
    array: true,
    default: [GenderEnum.UNISEX],
  })
  public gender?: GenderEnum;

  @OneToOne(() => Prices, (prices) => prices.product)
  public prices: Prices;

  @OneToMany(() => Reviews, (reviews) => reviews.product)
  public reviews?: Reviews[];

  @Column({
    nullable: true,
  })
  public deliveryId?: string;

  @Column({
    default: true,
  })
  public onSales: boolean;
}
