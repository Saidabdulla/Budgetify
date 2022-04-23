import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
    userAccounts: any;

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.http.get('http://localhost:3000/main').subscribe(
            (data) => {
                this.userAccounts = data;
            },
            (error) => {
                console.log(error);
            }
        );
    }
}
