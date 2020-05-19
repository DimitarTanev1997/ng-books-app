import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthenticationService } from './services/authentication/authentication.service';
import { AuthGuard } from './guards/auth-guards';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [SignInFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [SignInFormComponent],
  providers: [AuthenticationService, AuthGuard]
})
export class AuthenticationModule { }
