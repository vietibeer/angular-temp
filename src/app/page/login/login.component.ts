import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HelperService } from 'app/services/helper.service';
import { AuthService } from 'app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    set f(loginForm) { loginForm.controls };
    get f() { return this.loginForm.controls };
    success: any;
    loginForm: FormGroup;
    submitted: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private helperS: HelperService,
        private authS: AuthService,
    ) {
        this.success = this.route.snapshot.params.register;
    }

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    onSubmit() {
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }

        this.authS.login(this.loginForm.value).subscribe(token => {
            console.log(token);
        }, err => {
            console.log(err);
        })

    }
}
