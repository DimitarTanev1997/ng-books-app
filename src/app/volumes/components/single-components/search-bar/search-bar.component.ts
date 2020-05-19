import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VolumesService } from '../../../services/volumes-service/volumes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-search-bar',
	templateUrl: './search-bar.component.html',
	styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
	searchBar: FormGroup;
	currentPage: string;
	isLoading: boolean = false;
	@Input() error?: string;
	isAdvancedSearchHidden: boolean = true;

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
		private volumesService: VolumesService
	) {}

	onSubmit(): void {
		if (!this.searchBar.valid) {
			return;
		}

		this.isLoading = true;

		Object.keys(this.searchBar.value).forEach(
			key =>
				this.searchBar.value[key] === null && delete this.searchBar.value[key]
		);

		this.volumesService.searchForVolumes(this.searchBar.value).subscribe(
			response => {
				this.volumesService.volumes.next(response);

				this.isLoading = false;

				this.router.navigate(['results'], {
					queryParams: this.searchBar.value
				});
			},
			() => {
				this.error = 'Something went wrong. Please try again.';
				this.isLoading = false;
			}
		);
	}

	ngOnInit(): void {
		this.currentPage = this.route.snapshot.url[0].path;

		this.searchBar = this.formBuilder.group({
			q: ['', [Validators.required]],
			maxResults: ['10'],
			orderBy: ['relevance'],
			filter: [],
			printType: ['all']
		});
	}
}
