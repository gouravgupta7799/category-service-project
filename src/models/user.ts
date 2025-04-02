import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  isDeleted: boolean;
  
}

 
