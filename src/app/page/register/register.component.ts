import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'app/services/helper.service';
import { AuthService } from 'app/services/auth.service';
import { Router } from "@angular/router";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    set f(registerForm) { registerForm.controls };
    get f() { return this.registerForm.controls };

    submitted: boolean = false;
    registerForm: FormGroup;
    constructor(
        private formBuilder: FormBuilder,
        private helperS: HelperService,
        private authS: AuthService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        this.registerForm = this.formBuilder.group({
            username: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            passwordConfirm: ['', Validators.required],
            termAndCondition: [false, Validators.required],
        }, { validator: this.helperS.MustMatch('password', 'passwordConfirm') });

    }

    onSubmit() {
        this.submitted = true;

        if (this.registerForm.invalid) {
            return;
        }
        
        this.authS.register(this.registerForm.value).subscribe(res => {
            this.router.navigate(['/login', res]);
        }, err => {
            console.log(err);
        })

        
    }

}
