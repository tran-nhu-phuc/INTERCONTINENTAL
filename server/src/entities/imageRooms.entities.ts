import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Room } from './rooms.entities';

@Entity('imageRooms')
export class ImageRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  linkImage1: string;

  @Column()
  linkImage2: string;

  @Column()
  linkImage3: string;

  @Column()
  linkImage4: string;

  @Column()
  linkImage5: string;

  @Column()
  roomId: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => Room, (room) => room.imageRoom, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  room: Room;
}
