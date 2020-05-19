import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http-service/http.service';
import { Observable, BehaviorSubject } from 'rxjs';
import VolumesResponse from '../../models/volumesResponse';
import Volume from '../../models/volume';
import { URL_BASE, API_KEY } from '../../constants/firebase-books';
import CustomVolume from '../../models/customVolume';
import { map } from 'rxjs/operators';

@Injectable()
export class VolumesService {
	volumes = new BehaviorSubject<Volume[]>(null);

	getVolumes(): Observable<Volume[]> {
		return this.volumes.asObservable();
	}

	constructor(private httpService: HttpService) {}

	searchForVolumes(requestObject: any): Observable<Volume[]> {
		return this.httpService
			.get('https://www.googleapis.com/books/v1/volumes?', requestObject)
			.pipe(
				map(responseData => {
					if (responseData.items) {
						return responseData.items;
					}

					return [];
				})
			);
	}

	getVolumeById(id: string): Observable<Volume> {
		return this.httpService.get(
			`https://www.googleapis.com/books/v1/volumes/${id}`
		);
	}

	getMyVolumes(localId: string): Observable<CustomVolume[]> {
		return this.httpService
			.get(`${URL_BASE}/my-books/${localId}.json?key=${API_KEY}`)
			.pipe(
				map(responseData => {
					if (responseData != null) {
						return Object.values(responseData);
					}

					return [];
				})
			);
	}

	addVolume(localId: string, data: CustomVolume): Observable<void> {
		return this.httpService.put(
			`${URL_BASE}/my-books/${localId}/${data.id}.json?key=${API_KEY}`,
			data
		);
	}

	deleteVolume(localId: string, volumeId: string): Observable<void> {
		return this.httpService.delete(
			`${URL_BASE}/my-books/${localId}/${volumeId}.json?key=${API_KEY}`
		);
	}
}
