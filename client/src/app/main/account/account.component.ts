import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TitleCasePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
    @Input() accounts: any;
    clickedAccount: any;
    errorMessage = '';
    currencies: any;

    constructor(private http: HttpClient, private router: Router) {}

    onAccountClick(item: object): void {
        this.clickedAccount = item;
    }

    updateAccountForm: FormGroup = new FormGroup({
        name: new FormControl(),
        description: new FormControl(),
        currency: new FormControl(),
    });

    updateAccount() {
        const body = { ...this.updateAccountForm.value };

        if (body.name) {
            body.name = body.name.toLowerCase();
        } else {
            delete body.name;
        }

        if (body.currency) {
            body.currency_id = body.currency._id;
        }
        delete body.currency;

        if (body.description === '' || body.description === null) {
            delete body.description;
        }

        this.http
            .put(
                `http://localhost:3000/account/${this.clickedAccount._id}`,
                body
            )
            .subscribe(
                (data) => {
                    window.location.reload();
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    deleteAccount(item: any): void {
        if (confirm('Are you sure you want to delete this account?')) {
            this.http
                .delete(`http://localhost:3000/account/${item._id}`)
                .subscribe(
                    (data) => {
                        window.location.reload();
                    },
                    (error) => {
                        console.log(error);
                    }
                );
        } else {
            return;
        }
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
