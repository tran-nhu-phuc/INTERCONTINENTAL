import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Booking } from './bookings.entities';

@Entity('customerInFo')
export class CustomerInFo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phone: number;

  @Column()
  nameRoom: string;

  @Column()
  countryCode: string;

  @Column()
  address: string;

  @Column()
  country: string;

  @Column()
  bookingId: number;

  @Column({ default: false })
  isDelete: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToOne(() => Booking, (booking) => booking.customerInFo, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  booking: Booking;
}
