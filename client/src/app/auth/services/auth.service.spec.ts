import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';

describe('Auth service with TestBed', () => {
    let service: AuthService;
    let httpController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });

        service = TestBed.inject(AuthService);
        httpController = TestBed.inject(HttpTestingController);
    });

    it('setSession have to call on success', (done: DoneFn) => {
        spyOn(service as any, 'setSession');
        const expectedResult = {
            Token: 'Token',
            expiresIn: 10000,
        };

        service.login('email', 'password').subscribe(() => {
            expect((service as any).setSession).toHaveBeenCalledOnceWith(
                expectedResult
            );
            done();
        });

        const req = httpController.expectOne({
            method: 'POST',
            url: `http://localhost:3000/auth/login`,
        });
        req.flush(expectedResult);
    });

    it('setSession have not to call on error', (done: DoneFn) => {
        spyOn(service as any, 'setSession');
        service.login('email', 'password').subscribe({
            error: () => {
                expect((service as any).setSession).not.toHaveBeenCalled();
                done();
            },
        });

        const req = httpController.expectOne({
            method: 'POST',
            url: `http://localhost:3000/auth/login`,
        });
        req.error(new ProgressEvent('401'));
    });
});

// xdescribe('AuthService', () => {
//     let service: AuthService;

//     beforeEach(() => {
//         TestBed.configureTestingModule({});
//         service = TestBed.inject(AuthService);
//     });

//     it('should be created', () => {
//         expect(service).toBeTruthy();
//     });
// });
