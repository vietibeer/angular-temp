import { Component, OnInit, Inject, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { environment } from 'environments/environment';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Booking } from 'app/models/booking';

export interface PaymentInterface {
    booking: Booking;
}

export const style = {
    base: {
        iconColor: '#666EE8',
        color: '#31325F',
        lineHeight: '40px',
        fontWeight: 300,
        fontFamily: 'Helvetica Neue',
        fontSize: '15px',

        '::placeholder': {
            color: '#CFD7E0',
        },
    },
};

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnDestroy {
    @ViewChild('cardNumber') cardNumRef: ElementRef;
    @ViewChild('cardExpiry') cardExpiryRef: ElementRef;
    @ViewChild('cardCvc') cardCvcRef: ElementRef;

    stripe: any;
    elements: any;

    cardNumber: any;
    cardExpiry: any;
    cardCvc: any;

    isValidatingCard: boolean = false;
    error: string = '';
    token: any;

    booking: Booking;

    constructor(
        public dialogRef: MatDialogRef<PaymentComponent>,
        @Inject(MAT_DIALOG_DATA) public data: PaymentInterface
    ) {
        this.stripe = Stripe(environment.STRIPE_PK);
        this.elements = this.stripe.elements();

        this.onChange = this.onChange.bind(this);
        this.booking = this.data.booking;
    }

    ngOnInit() {
        this.createElement();
    }

    /**
     * Function submit
     */
    async onSubmit() {

        try {
            //show loading
            this.isValidatingCard = true;

            const { token, error } = await this.stripe.createToken(this.cardNumber);

            this.isValidatingCard = false;

            if (token) {
                this.token = token;
                this.close(this.token);
            } else {
                console.error(error);
            }

        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Function validation card
     */
    isCardValid(): boolean {
        return this.cardNumber._complete && this.cardExpiry._complete && this.cardCvc._complete;
    }

    /**
     * Function close popup
     * @param data 
     */
    close(data) {
        this.dialogRef.close(data);
    }

    onChange({ error }) {
        if (error) {
            this.error = error.message;
        } else {
            this.error = '';
        }
    }

    /**
     * Function create element card
     */
    createElement() {
        this.cardNumber = this.elements.create('cardNumber', { style });
        this.cardNumber.mount(this.cardNumRef.nativeElement);

        this.cardExpiry = this.elements.create('cardExpiry', { style });
        this.cardExpiry.mount(this.cardExpiryRef.nativeElement);

        this.cardCvc = this.elements.create('cardCvc', { style });
        this.cardCvc.mount(this.cardCvcRef.nativeElement);

        this.cardNumber.addEventListener('change', this.onChange);
        this.cardExpiry.addEventListener('change', this.onChange);
        this.cardCvc.addEventListener('change', this.onChange);
    }

    ngOnDestroy() {
        this.cardNumber.removeEventListener('change', this.onChange);
        this.cardExpiry.removeEventListener('change', this.onChange);
        this.cardCvc.removeEventListener('change', this.onChange);

        this.cardNumber.destroy();
        this.cardExpiry.destroy();
        this.cardCvc.destroy();
    }

}
