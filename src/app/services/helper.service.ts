import { FormGroup } from '@angular/forms';
import { Injectable } from "@angular/core";
import * as moment from "moment";
import { Booking } from "../models/booking";

@Injectable()
export class HelperService {
    constructor() { }

    /**
     * Function compare password with password confirm
     * @param {string} controlName 
     * @param {string} matchingControlName 
     */
    MustMatch(controlName: string, matchingControlName: string) {

        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];

            if (matchingControl.errors && !matchingControl.errors.mustMatch) {
                // return if another validator has already found an error on the matchingControl
                return;
            }

            // set error on matchingControl if validation fails
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
            } else {
                matchingControl.setErrors(null);
            }
        }

    }

    /**
     * Function get range of dates
     * @param {Date} startAt 
     * @param {Date} endAt 
     * @param {string} formatDate 
     */
    private getRangeOfDates(startAt, endAt, formatDate) {
        const tempDates = [];

        let mEndAt = moment(endAt);
        let mStartAt = moment(startAt);

        while (mStartAt < mEndAt) {
            tempDates.push(mStartAt.format(formatDate));
            mStartAt = mStartAt.add(1, 'days');
        }

        tempDates.push(moment(mStartAt).format(formatDate));
        tempDates.push(moment(mEndAt).format(formatDate));

        return tempDates;
    }

    /**
     * Function get booking range dates
     * @param {Date} startAt
     * @param {Date} endAt 
     */
    getBookingRangeDates(startAt, endAt) {
        return this.getRangeOfDates(startAt, endAt, Booking.DATE_FORMAT);
    }

}