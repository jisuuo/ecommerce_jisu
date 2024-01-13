import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Products } from '../../products/entities/products.entity';
import { BaseEntity } from '../../common/base.entity';

@Entity()
export class Prices extends BaseEntity {
  @OneToOne(() => Products, (product) => product.reviews)
  @JoinColumn()
  product: Products;

  @Column({
    default: 0,
  })
  nonMembers: number;

  @Column({
    default: 0,
  })
  members: number;
}
