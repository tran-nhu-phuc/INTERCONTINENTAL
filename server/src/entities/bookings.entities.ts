import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './users.entities';
import { CustomerInFo } from './customerInFo.entities';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roomId: number;

  @Column()
  timeCheckIn: Date;

  @Column()
  timeCheckOut: Date;

  @Column()
  paymentType: number;

  @Column()
  nameRoom: string;

  @Column()
  totalPrice: number;

  @Column()
  phone: number;

  @Column()
  numberRooms: number;

  @Column({ default: 1 })
  status: number;

  @Column()
  city: string;

  @Column()
  cityCode: string;

  @Column()
  numberUser: number;

  @Column()
  numberChild: number;

  @Column()
  userId: number;

  @Column({ unique: true })
  code: string;

  @Column({ default: 0 })
  isVouchers: number;

  @Column()
  firstPrice: number;

  @Column({ default: false })
  isDelete: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.booking, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @OneToOne(() => CustomerInFo, (customerInFo) => customerInFo.booking, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  customerInFo: CustomerInFo;
}
