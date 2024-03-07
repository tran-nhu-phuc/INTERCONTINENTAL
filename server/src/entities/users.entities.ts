import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Booking } from './bookings.entities';
import { Comment } from './comments.entities';
import { Like } from './likes.entities';
import { Point } from './points.entities';
import { Ratting } from './rattings.entities';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  phone: number;

  @Column({
    default:
      'https://th.bing.com/th/id/OIP.c5KXw-wPcnwyyBNayoXfFQAAAA?rs=1&pid=ImgDetMain',
  })
  avatar: string;

  @Column({ default: 1 })
  status: number;

  @Column()
  role: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => Booking, (booking) => booking.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  booking: Booking[];

  @OneToMany(() => Comment, (comment) => comment.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  comment: Comment[];

  @OneToMany(() => Like, (like) => like.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  like: Like[];

  @OneToOne(() => Point, (point) => point.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  point: Point;

  @OneToMany(() => Ratting, (ratting) => ratting.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  ratting: Ratting[];
}
