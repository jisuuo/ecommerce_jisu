import { Column, Entity, OneToOne } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { User } from './user.entity';

@Entity()
export class AddressEntity extends BaseEntity {
  @Column()
  public street: string;

  @Column()
  public city: string;

  @Column()
  public country: string;

  // OneToOne 관계형은 안넣어도 상관없는 옵셔널
  @OneToOne(() => User, (user: User) => user.address)
  public user: User;
}
