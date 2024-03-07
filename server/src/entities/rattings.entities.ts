import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './users.entities';
import { Room } from './rooms.entities';

@Entity('rattings')
export class Ratting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rate: number;

  @Column({ default: 1 })
  status: number;

  @Column()
  userId: number;

  @Column()
  roomId: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.ratting, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Room, (room) => room.ratting, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  room: Room;
}
