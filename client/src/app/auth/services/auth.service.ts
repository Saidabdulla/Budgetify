import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpErrorResponse,
    HttpParams,
} from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient) {}

    login(email: string, password: string) {
        return this.http
            .post('http://localhost:3000/auth/login', {
                email,
                password,
            })
            .pipe(
                tap((res) => this.setSession(res)),
                catchError(this.handleError)
            );
    }

    isLoggedIn() {
        const expiresIn = localStorage.getItem('expiresIn');
        if (expiresIn) {
            return Date.now() < Number(expiresIn);
        }
        return false;
    }

    logout() {
        localStorage.removeItem('expiresIn');
        localStorage.removeItem('Token');
    }

    private setSession(res: any) {
        const expiresIn = Date.now() + Number(res.expiresIn);
        localStorage.setItem('user', res.firstName + ' ' + res.lastName);
        localStorage.setItem('Token', res.token);
        localStorage.setItem('expiresIn', String(expiresIn));
    }

    handleError(error: HttpErrorResponse) {
        return throwError(error || 'Server Error');
    }
}
