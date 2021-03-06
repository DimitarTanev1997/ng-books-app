import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private authService: AuthenticationService,
		private router: Router
	) {}
	canActivate() {
		if (this.authService.getLoggedUser() !== null) {
			return true;
		}

		this.router.navigate(['signIn']);

		return false;
	}
}
