import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comment } from './comments.entities';
import { ImageRoom } from './imageRooms.entities';
import { Ratting } from './rattings.entities';
import { Category } from './categories.entities';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({ default: 1 })
  status: number;

  @Column()
  stock: number;

  @Column()
  countUser: number;

  @Column()
  categoryId: number;

  @Column({ default: false })
  isDelete: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => Comment, (comment) => comment.room, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  comment: Comment;

  @OneToMany(() => ImageRoom, (imageRoom) => imageRoom.room, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  imageRoom: ImageRoom;

  @OneToMany(() => Ratting, (ratting) => ratting.room, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  ratting: Ratting[];

  @ManyToOne(() => Category, (category) => category.room, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  category: Category;
}
