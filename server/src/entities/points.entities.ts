import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './users.entities';

@Entity('points')
export class Point {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 15 })
  pointNumber: string;

  @Column()
  userId: number;

  @Column({ default: false })
  isDelete: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.point, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  user: User;
}
