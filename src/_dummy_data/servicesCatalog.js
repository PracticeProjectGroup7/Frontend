const doctorsCatalog = [
  {
    id: 1,
    name: 'Dr. John Doe',
    specialization: 'Cardiologist',
    experience: 15,
  },
  {
    id: 2,
    name: 'Dr. Jane Smith',
    specialization: 'Pediatrician',
    experience: 10,
  },
  {
    id: 3,
    name: 'Dr. Brendon Smith',
    specialization: 'OB/GYN',
    experience: 12,
  },
  {
    id: 4,
    name: 'Dr. Sad Smith',
    specialization: 'General Physician',
    experience: 4,
  },
  {
    id: 5,
    name: 'Dr. Human Smith',
    specialization: 'General Physician/Pediatrician',
    experience: 7,
  },
];

const labTestCatalog = [
  {
    id: 1,
    name: 'CBC Test',
    description: 'Complete Blood Count',
  },
  {
    id: 2,
    name: 'Chest X-ray',
    description: 'Do you have TB, hm?',
  },
];

const availableDoctorSlots = [
  {
    startTime: new Date('2023-10-24T09:00:00'),
    endTime: new Date('2023-10-24T10:00:00'),
    duration: '1 hr',
  },
  {
    startTime: new Date('2023-10-24T10:30:00'),
    endTime: new Date('2023-10-24T11:30:00'),
    duration: '1 hr',
  },
  {
    startTime: new Date('2023-10-24T13:00:00'),
    endTime: new Date('2023-10-24T14:00:00'),
    duration: '1 hr',
  },
  {
    startTime: new Date('2023-10-24T14:30:00'),
    endTime: new Date('2023-10-24T15:30:00'),
    duration: '1 hr',
  },
  {
    startTime: new Date('2023-10-25T11:30:00'),
    endTime: new Date('2023-10-25T12:30:00'),
    duration: '1 hr',
  },
  {
    startTime: new Date('2023-10-25T15:30:00'),
    endTime: new Date('2023-10-25T16:30:00'),
    duration: '1 hr',
  },
  {
    startTime: new Date('2023-10-26T10:30:00'),
    endTime: new Date('2023-10-26T11:30:00'),
    duration: '1 hr',
  },
];

const labTestSlots = [
  {
    date: new Date('2023-10-24T00:00:00'),
    availableSlots: 1,
  },
  {
    date: new Date('2023-10-25T00:00:00'),
    availableSlots: 0,
  },
  {
    date: new Date('2023-10-26T00:00:00'),
    availableSlots: 3,
  },
  {
    date: new Date('2023-10-27T00:00:00'),
    availableSlots: 5,
  },
  {
    date: new Date('2023-10-28T00:00:00'),
    availableSlots: 7,
  },
  {
    date: new Date('2023-10-29T00:00:00'),
    availableSlots: 8,
  },
  {
    date: new Date('2023-10-30T00:00:00'),
    availableSlots: 10,
  },
];

export {
  doctorsCatalog,
  labTestCatalog,
  availableDoctorSlots,
  labTestSlots,
};
