import { Component, OnInit, Input, Output } from '@angular/core';
import Volume from '../../../models/volume';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import LoggedUser from 'src/app/authentication/models/loggedUser';
import { AuthenticationService } from 'src/app/authentication/services/authentication/authentication.service';
import { Subscription } from 'rxjs';
import { VolumesService } from 'src/app/volumes/services/volumes-service/volumes.service';

@Component({
	selector: 'app-volume-card',
	templateUrl: './volume-card.component.html',
	styleUrls: ['./volume-card.component.css']
})
export class VolumeCardComponent implements OnInit {
	@Input() volume: Volume;
	currentPage: string;
	loggedUserSub: Subscription;
	loggedUser: LoggedUser;
	genericThumbnail: string =
		'../../../../../assets/images/generic-book-cover.jpg';
	@Output() deleteEvent: EventEmitter<string> = new EventEmitter<string>();
	@Output() addEvent: EventEmitter<Volume> = new EventEmitter<Volume>();

	constructor(
		private route: ActivatedRoute,
		private authService: AuthenticationService,
		private volumesService: VolumesService,
		private router: Router
	) {}

	onDelete(): void {
		this.deleteEvent.emit(this.volume.id);
	}

	onEdit(): void {
		this.router.navigate(['volumeForm'], {
			queryParams: {
				mode: 'edit',
				id: this.volume.id,
				title: this.volume.volumeInfo.title,
				authors: this.volume.volumeInfo.authors,
				publisher: this.volume.volumeInfo.publisher,
				publishedDate: this.volume.volumeInfo.publishedDate,
				pageCount: this.volume.volumeInfo.pageCount,
				thumbnail: this.volume.volumeInfo.imageLinks.thumbnail
			}
		});
	}

	onAdd(): void {
		event.stopPropagation();
		this.volumesService
			.addVolume(this.loggedUser.localId, {
				id: this.volume.id,
				volumeInfo: this.volume.volumeInfo
			})
			.subscribe(() => {
				this.router.navigate(['myVolumes']);
			});
	}

	ngOnInit(): void {
		this.loggedUserSub = this.authService.user.subscribe(response => {
			this.loggedUser = response;
		});

		this.currentPage = this.route.snapshot.url[0].path;
	}

	ngOnDestroy(): void {
		this.loggedUserSub.unsubscribe();
	}
}
