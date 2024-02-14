import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';


@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  todoId: number;

  @Column()
  content: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: false })
  completionStatus: boolean;

  @ManyToOne(() => User, user => user.todos)
  user: User;
}
