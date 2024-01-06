import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';

@Entity()
export class ReviewEntity extends BaseEntity {
  @Column()
  title: string;

  @Column()
  desc: string;
}
