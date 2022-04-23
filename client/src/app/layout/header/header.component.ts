import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    @Input() isLoggedIn!: boolean;
    @Output() loggedOutClicked: EventEmitter<void> = new EventEmitter<void>();
    constructor() {}

    loggedUser = localStorage.getItem('user');

    onClick(): void {
        this.loggedOutClicked.emit();
    }
}
