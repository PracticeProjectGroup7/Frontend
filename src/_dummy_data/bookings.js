import { BOOKING_TYPE_LAB, BOOKING_TYPE_DOCTOR } from '../config/constants';
import { PAYMENT_STATS_PAID, PAYMENT_STATS_UNPAID } from '../config/constants';

const doctorBooking = {
  id: 'q12345',
  patientName: 'Pope Francis',
  patientId: '123456',
  dob: '19-02-2001',
  gender: 'M',
  doctorName: 'Doe John',
  appointmentDate: '30 October 2023',
  status: 'pending',
  diagnosis: '',
};

const labBooking = {
  id: 'q12345',
  patientName: 'A Person',
  patientId: '123456',
  dob: '19-02-2001',
  gender: 'M',
  testName: 'CBC test',
  testDate: '30 October 2023',
  status: 'pending',
  testResult: '',
};

const doctorBookingList = [
  {
    id: 'q12345',
    patientName: 'Pope Francis',
    patientId: '123456',
    doctorName: 'Doe John',
    appointmentDate: '30 October 2023',
    status: 'pending',
  },
  {
    id: 'q12347',
    patientName: 'Marie Curie',
    patientId: '123457',
    doctorName: 'Alexander Fleming',
    appointmentDate: '21 October 2023',
    status: 'completed',
  },
];

const labBookingList = [
  {
    id: 'q12345',
    patientName: 'A Person',
    patientId: '123456',
    testName: 'CBC test',
    testDate: '30 October 2023',
    status: 'pending',
  },
  {
    id: 'q12347',
    patientName: 'B Person',
    patientId: '123457',
    testName: 'Chest X-ray',
    testDate: '21 October 2023',
    status: 'completed',
  },
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
