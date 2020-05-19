import { Component, OnInit } from '@angular/core';
import { VolumesService } from 'src/app/volumes/services/volumes-service/volumes.service';
import { AuthenticationService } from 'src/app/authentication/services/authentication/authentication.service';
import LoggedUser from 'src/app/authentication/models/loggedUser';
import VolumesResponse from 'src/app/volumes/models/volumesResponse';
import CustomVolume from 'src/app/volumes/models/customVolume';

@Component({
	selector: 'app-my-volumes-page',
	templateUrl: './my-volumes-page.component.html',
	styleUrls: ['./my-volumes-page.component.css']
})
export class MyVolumesPageComponent implements OnInit {
	volumesData: Array<CustomVolume>;
	loggedUser: LoggedUser;
	isLoading: boolean = true;

	constructor(
		private volumesService: VolumesService,
		private authService: AuthenticationService
	) {}

	deleteVolume(volumeId: string): void {
		this.volumesService
			.deleteVolume(this.loggedUser.localId, volumeId)
			.subscribe(response => {
				this.volumesData = this.volumesData.filter(
					volume => volume.id != volumeId
				);
			});
	}

	ngOnInit(): void {
		this.loggedUser = this.authService.getLoggedUser();

		this.volumesService
			.getMyVolumes(this.loggedUser.localId)
			.subscribe(response => {
				this.volumesData = response;
				this.isLoading = false;
			});
	}
}
