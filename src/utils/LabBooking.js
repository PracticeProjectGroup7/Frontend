// File: LabBooking.js
import BookingTemplate from './BookingTemplate';

export default class LabBooking extends BookingTemplate {
  constructor() {
    super(false);
  }

  computeTypeSpecificDetails(booking) {
    // retrieve lab-specific details in the template
    if (booking && booking.details) {
      this.bookingDetails.bookingName = booking.details.testName;
      this.bookingDetails.results = booking.details.testResult;
    }
  }
}
