import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CategoryComponent } from './category/category.component';
import { MainComponent } from './main/main.component';
import { StatisticComponent } from './statistic/statistic.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthFormComponent } from './auth/auth-form/auth-form.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { ObligatoryComponent } from './obligatory/obligatory.component';

const routes: Routes = [
    {
        path: 'main',
        component: MainComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'category',
        component: CategoryComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'subscription',
        component: SubscriptionComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'obligatory',
        component: ObligatoryComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'statistic',
        component: StatisticComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'login',
        component: AuthFormComponent,
    },
    {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full',
    },
    { path: '**', component: NotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
