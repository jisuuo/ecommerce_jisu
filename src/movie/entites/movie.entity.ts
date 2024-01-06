import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';

@Entity()
export class Movie extends BaseEntity {
  @Column()
  language: string;

  @Column()
  title: string;

  @Column()
  overview: string;

  @Column()
  popularity: string;

  @Column()
  poster: string;

  @Column()
  release: string;
}
