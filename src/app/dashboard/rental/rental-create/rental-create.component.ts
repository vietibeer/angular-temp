import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Rental } from 'app/models/rental';
import { RentalService } from '../rental.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-rental-create',
    templateUrl: './rental-create.component.html',
    styleUrls: ['./rental-create.component.css']
})
export class RentalCreateComponent implements OnInit {

    createForm: FormGroup;
    rentalCategories = Rental.CATEGORIES;
    errors: any[] = [];
    isEdit = false;
    constructor(
        private formBuilder: FormBuilder,
        private rentalS: RentalService,
        private router: Router,
        private activateRoute: ActivatedRoute
    ) {
        this.activateRoute.params.subscribe(params => {
            const rentalId = params['id'];
            if (rentalId) {
                this.getRentalDetail(rentalId);
            }
        });
    }

    ngOnInit() {
        const data: Rental = {
            id: '',
            image: '',
            title: '',
            desc: '',
            footerTitle: '',
            position: '',
            city: '',
            dailyRate: 0,
            shared: true,
            bedrooms: 0,
            category: '',
            bookings: [],
            createdAt: '',
        }
        const rental = new Rental(data);
        this.initForm(rental);
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

    initForm(rental) {
        this.createForm = this.formBuilder.group({
            title: [rental.title, Validators.required],
            image: [rental.image, Validators.required],
            footerTitle: [rental.footerTitle, Validators.required],
            position: [rental.position, [Validators.required]],
            city: [rental.city, Validators.required],
            bedrooms: [rental.bedrooms, Validators.required],
            category: [rental.category, Validators.required],
            dailyRate: [rental.dailyRate, Validators.required],
            desc: [rental.desc, Validators.required],
            shared: [rental.shared, Validators.required],
        });

        
    }

    getRentalDetail(id) {
        this.errors = [];
        this.rentalS.getRentalById(id).subscribe(data => {
            this.isEdit = true;
            this.initForm(data);
        });
    }
}
