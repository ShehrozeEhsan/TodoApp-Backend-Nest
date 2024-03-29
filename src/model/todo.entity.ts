import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, UpdateDateColumn, DeleteDateColumn } from 'typeorm';


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

  @Column()
  userId: number;

  @UpdateDateColumn()
  updatedDate: Date;

  @Column({ default: -1 })
  updatedBy: number;  

  @DeleteDateColumn()
  deletedDate: Date

  @Column({default:-1})
  deletedBy: number;
}