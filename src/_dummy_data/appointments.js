import { BOOKING_TYPE_LAB, BOOKING_TYPE_DOCTOR } from '../config/constants';
import { PAYMENT_STATS_PAID, PAYMENT_STATS_UNPAID } from '../config/constants';

const doctorAppointment = {

};

const labAppointment = {

};

const doctorAppointmentList = [

];

const labAppointmentList = [

];

// Sorted desc by appointmentDate
const mixedAppointmentList = [
  {
    id: 'asd2qw',
    appointmentId: '12344',
    appointmentDate: '1796550286000',
    appointmentType: BOOKING_TYPE_DOCTOR,
    billId: '123123123',
  },
  {
    id: 'asd',
    appointmentId: '12443',
    appointmentDate: '1698550286000',
    appointmentType: BOOKING_TYPE_LAB,
    billId: '123123123',
  },
  {
    id: 'asd2',
    appointmentId: '12324',
    appointmentDate: '1697550286000',
    appointmentType: BOOKING_TYPE_LAB,
    billId: '123123123',
  },
  {
    id: 'asds',
    appointmentId: '12234',
    appointmentDate: '1696550286000',
    appointmentType: BOOKING_TYPE_DOCTOR,
    billId: '123123123',
  },
];

const bill = {
  billId: '787t6tg',
  paymentStatus: PAYMENT_STATS_UNPAID,
  serviceType: BOOKING_TYPE_DOCTOR,
  appointmentDate: '1696550286000',
  appointmentPerson: 'Dr. Greg Stone',
  total: 100.00,
  fees: [
    {
      name: 'Appointment',
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
  doctorAppointment,
  labAppointment,
  doctorAppointmentList,
  labAppointmentList,
  mixedAppointmentList,
  bill,
};
