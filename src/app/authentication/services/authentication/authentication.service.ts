import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import LoggedUser from '../../models/loggedUser';
import { HttpService } from 'src/app/shared/services/http-service/http.service';
import { tap } from 'rxjs/operators';
import { URL_AUTH, API_KEY } from '../../constants/authentication';
import AuthRequest from '../../models/authRequest';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
	user = new BehaviorSubject<LoggedUser>(null);

	constructor(private http: HttpService, private router: Router) {}

	authenticate(data: AuthRequest): Observable<LoggedUser> {
		return this.http
			.post(`${URL_AUTH}accounts:signInWithPassword?key=${API_KEY}`, data)
			.pipe(
				tap(resData => {
					this.user.next(resData);
				})
			);
	}

	autoLogin(): void {
		const loggedUser: LoggedUser = this.getLoggedUser();

		if (!loggedUser) {
			return;
		}
		this.user.next(loggedUser);
	}

	logout(): void {
		this.user.next(null);
		window.sessionStorage.removeItem('loggedUser');
		this.router.navigate(['home']);
	}

	getLoggedUser(): LoggedUser {
		return JSON.parse(window.sessionStorage.getItem('loggedUser'));
	}
}
