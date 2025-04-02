import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Categories } from './categories';
import { ServicePrice } from './servicePrice';


@Entity()
export class Service {

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: Date;

  @Column({
    type: 'varchar',
  })
  serviceName: string;

  @Column({
    type: 'text',
  })
  type: string;

  // Each Project can have many Tasks
  @ManyToOne(() => Categories, (categorie) => categorie.service)
  categorie: Categories // Relating Project to multiple Tasks


  // Each Project can have many Tasks
  @OneToMany(() => ServicePrice, (servicePrice) => servicePrice.ServicePrice)
  priceType: ServicePrice[]; // Relating Project to multiple Tasks
}
