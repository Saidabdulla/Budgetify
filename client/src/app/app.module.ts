import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { LayoutModule } from './layout/layout.module';
import { ObligatoryComponent } from './obligatory/obligatory.component';
import { SubscriptionComponent } from './subscription/subscription.component';

@NgModule({
    declarations: [AppComponent, NotFoundComponent, ObligatoryComponent, SubscriptionComponent],
    imports: [
        AppRoutingModule,
        BrowserModule,
        SharedModule,
        LayoutModule,
        AuthModule,
        HttpClientModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
