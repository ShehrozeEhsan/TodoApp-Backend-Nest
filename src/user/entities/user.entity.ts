import { Todo } from 'src/todo/entities/todo.entity';
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

  @OneToMany(() => Todo, todo => todo.user)
  todos: Todo[];
}
