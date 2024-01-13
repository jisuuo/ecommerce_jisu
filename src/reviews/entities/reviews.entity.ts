import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { Products } from '../../products/entities/products.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Reviews extends BaseEntity {
  @ManyToOne(() => Products, (product) => product.reviews)
  @ApiProperty()
  product: Products;

  @Column()
  @ApiProperty()
  title: string;

  @Column()
  @ApiProperty()
  desc: string;
}
