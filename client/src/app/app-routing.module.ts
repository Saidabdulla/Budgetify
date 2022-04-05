import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CategoryComponent } from './category/category.component';
import { MainComponent } from './main/main.component';
import { StatisticComponent } from './statistic/statistic.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
    {
        path: 'main',
        component: MainComponent,
    },
    {
        path: 'category',
        component: CategoryComponent,
    },
    {
        path: 'statistic',
        component: StatisticComponent,
    },
    {
        path: 'admin',
        component: AdminComponent,
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', component: NotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
