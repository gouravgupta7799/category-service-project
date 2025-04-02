import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Categories } from './categories';
import { Service } from './service';


enum typeEnums {
    Hourly = 'Hourly',
    Weekly = 'Weekly',
    Monthly = 'Monthly'
}

@Entity()
export class ServicePrice {

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
        type: 'text',
    })
    Duration: string;

    @Column({
      type: 'varchar',
    })
    Price: string;


    @Column({
        type: 'enum',
        enum:typeEnums
    })
    Type: typeEnums;


  // Each Project can have many Tasks
  @ManyToOne(() => Service, (Service) => Service.priceType)
  ServicePrice: Service // Relating Project to multiple Tasks
}
