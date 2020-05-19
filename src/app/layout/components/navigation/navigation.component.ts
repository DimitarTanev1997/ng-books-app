import { Component, OnInit, OnDestroy } from '@angular/core';
import LoggedUser from 'src/app/shared/models/loggedUser';
import { AuthenticationService } from 'src/app/authentication/services/authentication/authentication.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {
	isHidden: boolean = false;
	closeIcon: boolean = false;
	menuIcon: boolean = true;
	currentWindowWidth: number;

	loggedUserSub: Subscription;

	loggedUser: LoggedUser;

	constructor(private authService: AuthenticationService) {}

	handleNav(): void {
		if (this.currentWindowWidth <= 480) {
			this.closeIcon = !this.closeIcon;
			this.menuIcon = !this.menuIcon;
			this.isHidden = !this.isHidden;
		}
	}

	onResize(event): void {
		this.currentWindowWidth = event.target.innerWidth;
	}

	onSignOut(): void {
		this.authService.logout();

		this.handleNav();
	}

	ngOnInit(): void {
		this.loggedUserSub = this.authService.user.subscribe(response => {
			this.loggedUser = response;
		});

		this.currentWindowWidth = window.innerWidth;
	}

	ngOnDestroy(): void {
		this.loggedUserSub.unsubscribe();
	}
}
