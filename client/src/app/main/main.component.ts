import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
    fakeData = [
        {
            isActive: true,
            name: 'Debit Card',
            sign: '$',
            balance: '5,125.5',
        },
        {
            isActive: false,
            name: 'Credit Card',
            sign: '€',
            balance: '1,125.5',
        },
    ];

    constructor() {}

    ngOnInit(): void {}
}
