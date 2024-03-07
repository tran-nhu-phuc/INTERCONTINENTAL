import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './users.entities';
import { Room } from './rooms.entities';
import { Like } from './likes.entities';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  userId: number;

  @Column()
  roomId: number;

  @Column({ default: 1 })
  status: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.comment, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Room, (room) => room.comment, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  room: Room;

  @OneToMany(() => Like, (like) => like.comment, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  like: Like[];
}
