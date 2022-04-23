import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
    @Input() accounts: any;
    clickedAccount: any;

    constructor() {}

    onAccountClick(item: object) {
        console.log(item);
        this.clickedAccount = item;
    }

    ngOnInit(): void {}
}
