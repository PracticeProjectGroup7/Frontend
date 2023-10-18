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
    appointmentType: 'doctor',
    billId: '123123123',
  },
  {
    id: 'asd',
    appointmentId: '12443',
    appointmentDate: '1698550286000',
    appointmentType: 'lab',
    billId: '123123123',
  },
  {
    id: 'asd2',
    appointmentId: '12324',
    appointmentDate: '1697550286000',
    appointmentType: 'lab',
    billId: '123123123',
  },
  {
    id: 'asds',
    appointmentId: '12234',
    appointmentDate: '1696550286000',
    appointmentType: 'doctor',
    billId: '123123123',
  },
];

const bill = {
  billId: '787t6tg',
  status: 'unpaid',
  serviceType: '',
  details: '',
  total: 100.00,
  fees: [
    {
      name: '',
      amount: 1.0,
    },
    {
      name: '',
      amount: 1.0,
    },
    {
      name: '',
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
