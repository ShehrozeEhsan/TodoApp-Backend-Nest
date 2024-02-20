import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({unique: true})
  username: string;

  @Column()
  password: string;

  @Column()
  fullName: string;

  @Column("simple-array")
  roles: string[];
}
