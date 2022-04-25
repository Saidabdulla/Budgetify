import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
    activeAccount: any;

    constructor(private http: HttpClient) {}

    countChangedHandler(acc: object) {
        this.activeAccount = acc;
    }

    ngOnInit(): void {}
}
