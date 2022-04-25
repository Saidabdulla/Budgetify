import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-transaction',
    templateUrl: './transaction.component.html',
    styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit {
    activeAccount: any;

    transactions: any;
    categories: any;
    transaction: any;

    @Input() set activeAccountMethod(account: any) {
        this.getTransactions(account);
        this.activeAccount = account;
    }

    constructor(private http: HttpClient, private router: Router) {}

    onTransactionClick(transaction: any) {
        this.transaction = transaction;
    }

    editTransactionForm = new FormGroup({
        amount: new FormControl(),
        isIncome: new FormControl(),
        description: new FormControl(),
        note: new FormControl(),
        category_id: new FormControl(),
    });

    editTransaction() {
        const body = {
            amount: this.editTransactionForm.value.amount,
            isIncome: this.editTransactionForm.value.isIncome,
            description: this.editTransactionForm.value.description,
            note: this.editTransactionForm.value.note,
            category_id: this.editTransactionForm.value.category_id,
        };

        if (!body.amount) {
            delete body.amount;
        }

        if (!body.isIncome) {
            delete body.isIncome;
        }

        if (!body.description) {
            delete body.description;
        }

        if (!body.note) {
            delete body.note;
        }

        if (!body.category_id) {
            delete body.category_id;
        }

        this.http
            .put(
                `http://localhost:3000/transaction/${this.transaction._id}`,
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

    deleteTransaction() {
        if (confirm('Are you sure you want to delete this transaction?')) {
            this.http
                .delete(
                    `http://localhost:3000/transaction/${this.transaction._id}`
                )
                .subscribe(
                    (data) => {
                        window.location.reload();
                    },
                    (error) => {
                        console.log(error);
                    }
                );
        } else return;
    }

    getTransactions(acc: any) {
        this.http
            .get(`http://localhost:3000/transaction/account/${acc._id}`)
            .subscribe(
                (data) => {
                    this.transactions = data;
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    ngOnInit(): void {
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

// {
//     account_id: {_id: '626423c937fc75a67caa2040', name: 'credit card', balance: 100000, description: 'Simple Card', currency_id: '6263b0179bc15e4cc8188416', …}
// amount: 5555
// category_id: {_id: '62370edefe38570e8557c1da', name: 'Education', isIncome: false, user_id: '62360bcf9878fbec8fcde11a'}
// createdAt: "2022-04-25T11:09:54.788Z"
// description: "asdasdas"
// isIncome: false
// note: "12312"
// updatedAt: "2022-04-25T11:09:54.788Z"
// user_id: "62360bcf9878fbec8fcde11a"
// __v: 0
// _id: "6266818282857a5615633392"
// }
