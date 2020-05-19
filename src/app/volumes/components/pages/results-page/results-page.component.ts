import { Component, OnInit, OnDestroy } from '@angular/core';
import { VolumesService } from 'src/app/volumes/services/volumes-service/volumes.service';
import { Subscription } from 'rxjs';
import VolumesResponse from 'src/app/volumes/models/volumesResponse';
import { ActivatedRoute } from '@angular/router';
import Volume from 'src/app/volumes/models/volume';

@Component({
	selector: 'app-results-page',
	templateUrl: './results-page.component.html',
	styleUrls: ['./results-page.component.css']
})
export class ResultsPageComponent implements OnInit, OnDestroy {
	volumesSubscription: Subscription;
	volumesData: Array<Volume>;
	resultString: string;
	paramsSub: Subscription;
	isLoading: boolean = true;
	error?: string;

	constructor(
		private volumesService: VolumesService,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.paramsSub = this.route.queryParams.subscribe(params => {
			this.resultString = params['q'];
		});

		this.volumesSubscription = this.volumesService
			.getVolumes()
			.subscribe(response => {
				this.volumesData = response;
				if (response != null) {
					this.isLoading = false;
				}
			});

		if (this.volumesData === null) {
			this.volumesService
				.searchForVolumes(this.route.snapshot.queryParams)
				.subscribe(
					response => {
						this.volumesData = response;
						this.isLoading = false;
					},
					() => {
						this.isLoading = false;
						this.error = 'Something went wrong. Please try again.';
					}
				);
		}
	}

	ngOnDestroy(): void {
		this.volumesSubscription.unsubscribe();
		this.paramsSub.unsubscribe();
	}
}
