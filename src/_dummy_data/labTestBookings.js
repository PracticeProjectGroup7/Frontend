const labTestBookings = [
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

const labTestBookingDetails = {
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

export {
  labTestBookings,
  labTestBookingDetails,
};
