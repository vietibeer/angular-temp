import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Rental } from 'app/models/rental';
import { RentalService } from '../rental.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-rental-create',
    templateUrl: './rental-create.component.html',
    styleUrls: ['./rental-create.component.css']
})
export class RentalCreateComponent implements OnInit {

    createForm: FormGroup;
    rentalCategories = Rental.CATEGORIES;
    errors: any[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private rentalS: RentalService,
        private router: Router
    ) { }

    ngOnInit() {
        this.initForm();
    }

    onSubmit() {

        const newRental = new Rental(this.createForm.value);

        this.rentalS.createRental(newRental).subscribe(res => {

            console.log(res);
            this.router.navigate(['/dashboard/rental/detail', res.id]);

        }, err => {
            console.log(err);
            this.errors = err.error.errors;
        })
    }

    handleUploadImage($event) {

        console.log($event);
        this.createForm.get('image').setValue('../../../assets/img/card-3.jpeg');
        
    }

    initForm() {

        this.createForm = this.formBuilder.group({
            title: ['', Validators.required],
            image: ['', Validators.required],
            footerTitle: ['', Validators.required],
            position: ['', [Validators.required, Validators.minLength(6)]],
            city: ['', Validators.required],
            bedrooms: ['', Validators.required],
            category: ['', Validators.required],
            dailyRate: ['', Validators.required],
            desc: ['', Validators.required],
            shared: [true, Validators.required],
        });
        
    }
}
