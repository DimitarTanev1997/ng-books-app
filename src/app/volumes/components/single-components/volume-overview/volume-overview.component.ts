import { Component, OnInit, Input } from '@angular/core';
import Volume from 'src/app/volumes/models/volume';

@Component({
	selector: 'app-volume-overview',
	templateUrl: './volume-overview.component.html',
	styleUrls: ['./volume-overview.component.css']
})
export class VolumeOverviewComponent implements OnInit {
	@Input() book: Volume;

	constructor() {}

	ngOnInit(): void {}
}
