import { ROLE_STAFF, ROLE_DOCTOR } from '../config/constants';
import { specialities } from '../config/specialities';
import { getRandomInt } from '../utils/utils';

const staffList = [
  {
    staffId: 1,
    firstName: 'Dr. John',
    lastName: 'Doe',
    type: ROLE_DOCTOR,
    nric: 'Dummy NRIC',
    phone: '9999990000',
    email: 'asd@ad.com',
    yearsOfExperience: 15,
    specialty: specialities[getRandomInt(specialities.length)],
  },
  {
    staffId: 2,
    firstName: 'Dr. Jane',
    lastName: 'Smith',

    type: ROLE_DOCTOR,
    specialty: specialities[getRandomInt(specialities.length)],
    email: 'asd@ad.com',

    yearsOfExperience: 10,
  },
  {
    staffId: 3,
    firstName: 'Brendon',
    lastName: 'Smith',

    type: ROLE_STAFF,
    email: 'asd@ad.com',
  },
  {
    staffId: 4,
    firstName: 'Dr. Sad',
    lastName: 'Smith',

    type: ROLE_DOCTOR,
    specialty: specialities[getRandomInt(specialities.length)],
    email: 'asd@ad.com',
    yearsOfExperience: 4,
  },
  {
    staffId: 5,
    firstName: 'Human',
    lastName: 'Smith',

    type: ROLE_STAFF,
    email: 'asd@ad.com',
  },
  {
    staffId: 10,
    firstName: 'Dr. John',
    lastName: 'Dow',

    type: ROLE_DOCTOR,
    specialty: specialities[getRandomInt(specialities.length)],
    email: 'asd@ad.com',
    yearsOfExperience: 15,
  },
];


export {
  staffList,
};
