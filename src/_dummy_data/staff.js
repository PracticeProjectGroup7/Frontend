import { ROLE_STAFF, ROLE_DOCTOR } from '../config/constants';

const staffList = [
  {
    staffId: 1,
    name: 'Dr. John Doe',
    type: ROLE_STAFF,
    email: 'asd@ad.com',
    experience: 15,
  },
  {
    staffId: 2,
    name: 'Dr. Jane Smith',
    type: ROLE_DOCTOR,
    specialization: 'Pediatrician',
    email: 'asd@ad.com',

    experience: 10,
  },
  {
    staffId: 3,
    name: 'Dr. Brendon Smith',
    type: ROLE_STAFF,
    email: 'asd@ad.com',

    experience: 12,
  },
  {
    staffId: 4,
    name: 'Dr. Sad Smith',
    type: ROLE_DOCTOR,
    specialization: 'General Physician',
    email: 'asd@ad.com',

    experience: 4,
  },
  {
    staffId: 5,
    name: 'Dr. Human Smith',
    type: ROLE_STAFF,
    email: 'asd@ad.com',

    experience: 7,
  },
  {
    staffId: 10,
    name: 'Dr. John Doe',
    type: ROLE_DOCTOR,
    specialization: 'Cardiologist',
    email: 'asd@ad.com',

    experience: 15,
  },
];


export {
  staffList,
};
