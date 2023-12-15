import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column()
  public des: string;

  @Column({
    default: 0,
  })
  public price: number;

  @Column({
    default: true,
  })
  public onSales: boolean;
}
