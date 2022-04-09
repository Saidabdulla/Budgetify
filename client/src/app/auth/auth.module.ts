import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [AuthFormComponent],
    imports: [CommonModule, SharedModule, ReactiveFormsModule],
    exports: [AuthFormComponent],
})
export class AuthModule {}
