// File: BookingTemplate.js
export default class BookingTemplate {
  constructor(isDoctorTypeBooking) {
    this.isDoctorTypeBooking = isDoctorTypeBooking;
    this.bookingDetails = {
      patientName: '',
      dateOfBirth: '',
      gender: '',
      bookingName: '',
      results: '',
    };
  }

  computeBookingDetails(booking) {
    if (booking && booking.patientDetails) {
      this.bookingDetails = {
        patientName: booking.patientDetails.patientName,
        dateOfBirth: booking.patientDetails.dateOfBirth,
        gender: booking.patientDetails.gender,
        bookingName: '',
        results: '',
      };
      computeTypeSpecificDetails(booking);
    }
  }

  computeTypeSpecificDetails(booking) {
    // To be implemented by subclasses
    throw new Error('Method not implemented');
  }
}

