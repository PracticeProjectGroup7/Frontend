// File: DoctorBooking.js
import BookingTemplate from './BookingTemplate';

export default class DoctorBooking extends BookingTemplate {
  constructor() {
    super(true);
  }

  computeTypeSpecificDetails(booking) {
    // retrieve doctor-specific details in the template
    if (booking && booking.details) {
      this.bookingDetails.bookingName = booking.details.doctorName;
      this.bookingDetails.results = booking.details.comments;
    }
  }
}
