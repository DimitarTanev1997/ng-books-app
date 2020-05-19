import { Component, OnInit } from '@angular/core';
import Volume from 'src/app/volumes/models/volume';
import { VolumesService } from 'src/app/volumes/services/volumes-service/volumes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-details-page',
	templateUrl: './details-page.component.html',
	styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit {
	book: Volume = null;

	constructor(
		private volumesService: VolumesService,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.volumesService
			.getVolumeById(this.route.snapshot.params['id'])
			.subscribe(response => {
				this.book = response;
			});
	}
}
