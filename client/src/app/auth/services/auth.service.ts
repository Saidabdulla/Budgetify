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

    logout() {
        localStorage.removeItem('expiresIn');
        localStorage.removeItem('idToken');
    }

    private setSession(res: any) {
        const expiresIn = Date.now() + Number(res.expiresIn);
        localStorage.setItem('idToken', res.apiKey);
        localStorage.setItem('expiresIn', String(expiresIn));
    }

    handleError(error: HttpErrorResponse) {
        return throwError(error || 'Server Error');
    }
}
