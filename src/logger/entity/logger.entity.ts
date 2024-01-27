import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';

@Entity()
export class Logger extends BaseEntity {
  @Column()
  public context: string;

  @Column()
  public message: string;

  @Column()
  public level: string;
}
