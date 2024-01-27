import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';

@Entity()
export class LocalFile extends BaseEntity {
  @Column()
  filename: string;

  @Column()
  path: string;

  @Column()
  mimetype: string;
}
