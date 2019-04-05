import { Rental } from './rental';

export class Booking {

  static readonly DATE_FORMAT = 'Y-MM-DD';

  id: string;
  startAt: string;
  endAt: string;
  totalPrice: number;
  guests: number;
  days: number;
  paymentToken: any;
  createdAt: string;
  rental: Rental; // 1 Booking just one 1 Rental

}