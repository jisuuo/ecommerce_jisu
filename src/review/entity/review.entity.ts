import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ReviewEntity extends BaseEntity {
  @Column()
  @ApiProperty()
  title: string;

  @Column()
  @ApiProperty()
  desc: string;
}
