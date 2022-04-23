import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
    errorMessage = '';
    currencies: any;

    constructor(private http: HttpClient, private router: Router) {}

    loginForm: FormGroup = new FormGroup({
        title: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        currency: new FormControl('', [Validators.required]),
        balance: new FormControl('', [Validators.required]),
    });

    onSubmit() {
        this.http
            .post('http://localhost:3000/account', {
                name: this.loginForm.value.title,
                currency_id: this.loginForm.value.currency._id,
                balance: this.loginForm.value.balance,
                description: this.loginForm.value.description,
            })
            .subscribe(
                (data) => {
                    window.location.reload();
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    ngOnInit(): void {
        this.http.get('http://localhost:3000/currency').subscribe(
            (data) => {
                this.currencies = data;
            },
            (error) => {
                console.log(error);
            }
        );
    }
}
