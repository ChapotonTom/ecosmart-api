import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ default: 0 })
  balance: number;

  @Column({ nullable: true })
  birthdate: Date;

  @Column()
  password: string;

  @Column()
  userType: string;

  @Column({ nullable: true })
  accountLinkId: string;

  @Column({ nullable: true })
  company: string;
}
