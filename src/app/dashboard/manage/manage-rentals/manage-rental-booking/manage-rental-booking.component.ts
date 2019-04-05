import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Booking } from 'app/models/booking';

export interface PopupInterface {
  bookings: Booking[];
}

@Component({
  selector: 'popup-rental-booking',
  templateUrl: './manage-rental-booking.component.html',
  styleUrls: ['./manage-rental-booking.component.css']
})
export class ManageRentalBookingComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ManageRentalBookingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PopupInterface
  ) { }

  ngOnInit() {}

  close() {
    this.dialogRef.close();
  }

}
