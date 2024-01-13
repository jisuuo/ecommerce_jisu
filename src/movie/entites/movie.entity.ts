import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Movie extends BaseEntity {
  @ApiProperty()
  @Column()
  language: string;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  overview: string;

  @ApiProperty()
  @Column()
  popularity: string;

  @ApiProperty()
  @Column()
  poster: string;

  @ApiProperty()
  @Column()
  release: string;
}
