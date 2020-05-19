import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpService {
	constructor(public http: HttpClient) {}

	private headers: HttpHeaders = new HttpHeaders({
		'Content-Type': 'application/json; charset=utf-8'
	});

	private DEFAULT_REQUEST_OPTIONS = {
		headers: this.headers,
		responseType: 'json'
	};

	private generateUrlParams(params: { [param: string]: string }): HttpParams {
		return new HttpParams({ fromObject: params });
	}

	public get(
		url: string,
		urlParams: { [param: string]: string } = {},
		requestOptions: any = {}
	): Observable<any> {
		const params: HttpParams = this.generateUrlParams(urlParams);
		requestOptions = this.generateUrlParams(requestOptions);
		requestOptions.params = params;
		return this.http.get(url, requestOptions);
	}

	public post(
		url: string,
		data: any = {},
		urlParams: { [param: string]: string } = {},
		requestOptions: any = {}
	): Observable<any> {
		const params: HttpParams = this.generateUrlParams(urlParams);
		requestOptions = this.generateUrlParams(requestOptions);
		requestOptions.params = params;
		return this.http.post(url, data, requestOptions);
	}

	public put(
		url: string,
		data: any = {},
		urlParams: { [param: string]: string } = {},
		requestOptions: any = {}
	): Observable<any> {
		const params: HttpParams = this.generateUrlParams(urlParams);
		requestOptions = this.generateUrlParams(requestOptions);
		requestOptions.params = params;
		return this.http.put(url, data, requestOptions);
	}

	public delete(
		url: string,
		urlParams: { [param: string]: string } = {},
		requestOptions: any = {}
	): Observable<any> {
		const params: HttpParams = this.generateUrlParams(urlParams);
		requestOptions = this.generateUrlParams(requestOptions);
		requestOptions.params = params;
		return this.http.delete(url, requestOptions);
	}
}
