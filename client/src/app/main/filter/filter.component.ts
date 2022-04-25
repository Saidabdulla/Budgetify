import { Component, OnInit, Input } from '@angular/core';
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
    @Input() activeAccount: any;
    currencies: any;
    categories: any;

    constructor(private http: HttpClient, private router: Router) {}

    addAccountForm: FormGroup = new FormGroup({
        title: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        currency: new FormControl('', [Validators.required]),
        balance: new FormControl('', [Validators.required]),
    });

    onSubmit() {
        this.http
            .post('http://localhost:3000/account', {
                name: this.addAccountForm.value.title,
                currency_id: this.addAccountForm.value.currency._id,
                balance: this.addAccountForm.value.balance,
                description: this.addAccountForm.value.description,
            })
            .subscribe(
                (data) => {
                    window.location.reload();
                },
                (error) => {
                    this.errorMessage = error.error;
                }
            );
    }

    addTransactionForm = new FormGroup({
        amount: new FormControl('', [Validators.required]),
        isIncome: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        note: new FormControl(),
        category_id: new FormControl('', [Validators.required]),
    });

    addTransactionMethod() {
        const body = {
            ...this.addTransactionForm.value,
            account_id: this.activeAccount._id,
        };

        this.http.post('http://localhost:3000/transaction', body).subscribe(
            (data) => {
                window.location.reload();
            },
            (error) => {
                this.errorMessage = error.error;
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

        this.http.get('http://localhost:3000/category').subscribe(
            (data) => {
                this.categories = data;
            },
            (error) => {
                console.log(error);
            }
        );
    }
}
