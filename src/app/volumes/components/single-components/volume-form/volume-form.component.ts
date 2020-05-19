import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VolumesService } from 'src/app/volumes/services/volumes-service/volumes.service';
import { AuthenticationService } from 'src/app/authentication/services/authentication/authentication.service';
import LoggedUser from 'src/app/authentication/models/loggedUser';
import { Router, ActivatedRoute } from '@angular/router';
import CustomVolume from 'src/app/volumes/models/customVolume';
import { formatDate } from '@angular/common';

@Component({
	selector: 'app-volume-form',
	templateUrl: './volume-form.component.html',
	styleUrls: ['./volume-form.component.css']
})
export class VolumeFormComponent implements OnInit {
	volumeForm: FormGroup;
	isLoading: boolean = false;
	error: string;
	loggedUser: LoggedUser;
	mode: string;

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthenticationService,
		private volumesService: VolumesService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	onSubmit(): void {
		this.isLoading = true;
		const requestData: CustomVolume = {
			id: this.volumeForm.get('id').value,
			volumeInfo: {
				title: this.volumeForm.get('title').value,
				authors: this.volumeForm.get('authors').value.split(),
				publisher: this.volumeForm.get('publisher').value,
				publishedDate: this.volumeForm.get('publishedDate').value,
				pageCount: this.volumeForm.get('pageCount').value,
				imageLinks: {
					thumbnail: this.volumeForm.get('thumbnail').value
				}
			}
		};

		this.volumesService
			.addVolume(this.loggedUser.localId, requestData)
			.subscribe(
				response => {
					this.isLoading = false;
					this.router.navigate(['myVolumes']);
				},
				() => {
					this.isLoading = false;
					this.error = 'Something went wrong. Please try again.';
				}
			);
	}

	mockData(): void {
		if (this.mode === 'create') {
			const token: number = new Date().getTime();

			this.volumeForm = this.formBuilder.group({
				id: [`id-${token}`],
				title: [`title-${token}`],
				authors: [`author-${token}`],
				publisher: [`publisher-${token}`],
				publishedDate: [formatDate('0000-00-00', 'yyyy-MM-dd', 'en')],
				pageCount: [`${token}`],
				thumbnail: ['']
			});
		}
	}

	ngOnInit(): void {
		this.loggedUser = this.authService.getLoggedUser();
		this.mode = this.route.snapshot.queryParams.mode;

		if (this.mode === 'create') {
			this.volumeForm = this.formBuilder.group({
				id: ['', Validators.required],
				title: ['', Validators.required],
				authors: [''],
				publisher: [''],
				publishedDate: [],
				pageCount: [''],
				thumbnail: ['']
			});
		} else {
			this.volumeForm = this.formBuilder.group({
				id: [
					{ value: this.route.snapshot.queryParams.id, disabled: true },
					Validators.required
				],
				title: [this.route.snapshot.queryParams.title, Validators.required],
				authors: [this.route.snapshot.queryParams.authors],
				publisher: [this.route.snapshot.queryParams.publisher],
				publishedDate: [
					formatDate(
						!this.route.snapshot.queryParams.publishedDate
							? '0000-00-00'
							: this.route.snapshot.queryParams.publishedDate,
						'yyyy-MM-dd',
						'en'
					)
				],
				pageCount: [this.route.snapshot.queryParams.pageCount],
				thumbnail: [this.route.snapshot.queryParams.thumbnail]
			});
		}
	}

	get id() {
		return this.volumeForm.get('id');
	}

	get title() {
		return this.volumeForm.get('title');
	}
}
