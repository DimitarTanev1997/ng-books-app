import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { VolumesService } from './services/volumes-service/volumes.service';
import { HttpService } from '../shared/services/http-service/http.service';
import { ResultsPageComponent } from './components/pages/results-page/results-page.component';
import { SharedModule } from '../shared/shared.module';
import { VolumeCardComponent } from './components/single-components/volume-card/volume-card.component';
import { SearchBarComponent } from './components/single-components/search-bar/search-bar.component';
import { RouterModule } from '@angular/router';
import { DetailsPageComponent } from './components/pages/details-page/details-page.component';
import { VolumeOverviewComponent } from './components/single-components/volume-overview/volume-overview.component';
import { MyVolumesPageComponent } from './components/pages/my-volumes-page/my-volumes-page.component';
import { VolumeFormComponent } from './components/single-components/volume-form/volume-form.component';

@NgModule({
	declarations: [
		HomePageComponent,
		SearchBarComponent,
		ResultsPageComponent,
		VolumeCardComponent,
		DetailsPageComponent,
		VolumeOverviewComponent,
		MyVolumesPageComponent,
		VolumeFormComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule,
		RouterModule
	],
	exports: [HomePageComponent, ResultsPageComponent, DetailsPageComponent],
	providers: [VolumesService, HttpService]
})
export class VolumesModule {}
