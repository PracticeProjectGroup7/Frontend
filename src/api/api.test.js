import { test, beforeEach } from 'vitest';
import { fetchBookings, fetchBookingDetails, updateBookingStatus } from './staffBookingManagement';
import { fetchDoctorSlots, bookServices } from './booking';


// Mock easyGet and easyPatch functions
const mockEasyGet = (response) => {
  return async (options) => {
    if (response) {
      return { done: true, body: response };
    } else {
      return { done: false, body: null };
    }
  };
};

const mockEasyPatch = (response) => {
  return async (options) => {
    if (response) {
      return { done: true, body: response };
    } else {
      return { done: false, body: null };
    }
  };
};

beforeEach(() => {
  // Mock easyGet and easyPatch globally
  globalThis.easyGet = mockEasyGet(null);
  globalThis.easyPatch = mockEasyPatch(null);
});

test('fetchBookings should fetch bookings', async () => {
  const mockResponse = {
    data: {
      items: [{ bookingId: 1 }, { bookingId: 2 }],
    },
  };
  globalThis.easyGet = mockEasyGet(mockResponse);

  const isDoctorTypeBooking = true; // Replace with the appropriate type
  fetchBookings(isDoctorTypeBooking);
});

test('fetchBookingDetails should fetch booking details', async () => {
  const mockResponse = {
    data: { bookingId: 1, details: 'Details' },
  };
  globalThis.easyGet = mockEasyGet(mockResponse);

  const bookingId = 1; // Replace with a valid booking ID
  await fetchBookingDetails(bookingId);
});

test('updateBookingStatus should update booking status', async () => {
  const mockResponse = { status: 'updated' };
  globalThis.easyPatch = mockEasyPatch(mockResponse);

  const isDoctorTypeBooking = true; // Replace with the appropriate type
  const bookingId = 1; // Replace with a valid booking ID
  const bookingInfo = { status: 'confirmed' }; // Replace with valid info

  await updateBookingStatus(isDoctorTypeBooking, bookingId, { bookingInfo });
});

test('fetchDoctorSlots should return available slots', async () => {
  const mockResponse = {
    data: { availableSlots: [1, 2, 3] },
  };
  globalThis.easyPatch = mockEasyPatch(mockResponse);

  const serviceId = 1;
  const selectedDate = '2023-12-03';

  await fetchDoctorSlots(serviceId, selectedDate);
});

test('bookServices should booking appointment/test', async () => {
  const mockResponse = { status: 'updated' };
  globalThis.easyPatch = mockEasyPatch(mockResponse);

  const bookingInfo = { bookingStatus: 'booked' };

  await bookServices({ bookingInfo });
});

