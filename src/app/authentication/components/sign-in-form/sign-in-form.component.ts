import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-sign-in-form',
	templateUrl: './sign-in-form.component.html',
	styleUrls: ['./sign-in-form.component.css']
})
export class SignInFormComponent implements OnInit {
	signInForm: FormGroup;
	isLoading: boolean = false;
	error: string = null;

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthenticationService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.signInForm = this.formBuilder.group({
			email: [
				'',
				[
					Validators.required,
					Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')
				]
			],
			password: ['', [Validators.required]]
		});
	}

	get email() {
		return this.signInForm.get('email');
	}

	get password() {
		return this.signInForm.get('password');
	}

	onSubmit(): void {
		this.isLoading = true;

		if (!this.signInForm.valid) {
			return;
		}

		this.authService.authenticate(this.signInForm.value).subscribe(
			responseData => {
				this.isLoading = false;

				window.sessionStorage.setItem(
					'loggedUser',
					JSON.stringify(responseData)
				);

				this.router.navigate(['/home']);
			},
			() => {
				this.isLoading = false;

				this.error = 'Email or password is incorrect!';
			}
		);

		this.signInForm.reset();
	}
}
