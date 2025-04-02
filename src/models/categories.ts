import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Service } from './service';

@Entity()
export class Categories {

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
    name: string;

  // Each Project can have many Tasks
  @OneToMany(() => Service, (service) => service.categorie)
  service: Service[]; // Relating Project to multiple Tasks
}
