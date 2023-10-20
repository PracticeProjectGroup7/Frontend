import { BOOKING_TYPE_LAB, BOOKING_TYPE_DOCTOR } from '../config/constants';
import { PAYMENT_STATS_PAID, PAYMENT_STATS_UNPAID } from '../config/constants';

const doctorBooking = {

};

const labBooking = {

};

const doctorBookingList = [

];

const labBookingList = [

];

// Sorted desc by bookingDate
const mixedBookingList = [
  {
    id: 'asd2qw',
    bookingId: '12344',
    bookingDate: '1796550286000',
    bookingType: BOOKING_TYPE_DOCTOR,
    billId: '123123123',
  },
  {
    id: 'asd',
    bookingId: '12443',
    bookingDate: '1698550286000',
    bookingType: BOOKING_TYPE_LAB,
    billId: '123123123',
  },
  {
    id: 'asd2',
    bookingId: '12324',
    bookingDate: '1697550286000',
    bookingType: BOOKING_TYPE_LAB,
    billId: '123123123',
  },
  {
    id: 'asds',
    bookingId: '12234',
    bookingDate: '1696550286000',
    bookingType: BOOKING_TYPE_DOCTOR,
    billId: '123123123',
  },
];

const bill = {
  billId: '787t6tg',
  paymentStatus: PAYMENT_STATS_UNPAID,
  serviceType: BOOKING_TYPE_DOCTOR,
  bookingDate: '1696550286000',
  bookingPerson: 'Dr. Greg Stone',
  total: 100.00,
  fees: [
    {
      name: 'Booking',
      amount: 1.0,
    },
    {
      name: 'Platform Fee',
      amount: 1.0,
    },
    {
      name: 'GST @ 8%',
      amount: 1.0,
    },
  ],
  paymentDate: '1696550286000',
};

export {
  doctorBooking,
  labBooking,
  doctorBookingList,
  labBookingList,
  mixedBookingList,
  bill,
};
