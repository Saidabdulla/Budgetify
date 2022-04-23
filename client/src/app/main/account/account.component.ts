import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
    @Input() accounts: any;
    clickedAccount: any;

    onAccountClick(item: object): void {
        this.clickedAccount = item;
    }

    constructor(private http: HttpClient) {}

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

    ngOnInit(): void {}
}
