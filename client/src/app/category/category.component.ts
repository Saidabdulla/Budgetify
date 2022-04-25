import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
    errorMessage = '';
    categories: any;

    constructor(private http: HttpClient, private router: Router) {}

    addExpenseCategoryForm: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required]),
    });

    addIncomeCategoryForm: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required]),
    });

    addExpenseCategory() {
        this.http
            .post('http://localhost:3000/category', {
                isIncome: false,
                name: this.addExpenseCategoryForm.value.name,
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

    addIncomeCategory() {
        this.http
            .post('http://localhost:3000/category', {
                isIncome: true,
                name: this.addIncomeCategoryForm.value.name,
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
