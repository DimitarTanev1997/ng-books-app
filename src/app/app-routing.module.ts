import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './volumes/components/pages/home-page/home-page.component';
import { ResultsPageComponent } from './volumes/components/pages/results-page/results-page.component';
import { DetailsPageComponent } from './volumes/components/pages/details-page/details-page.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { SignInFormComponent } from './authentication/components/sign-in-form/sign-in-form.component';
import { MyVolumesPageComponent } from './volumes/components/pages/my-volumes-page/my-volumes-page.component';
import { VolumeFormComponent } from './volumes/components/single-components/volume-form/volume-form.component';
import { AuthGuard } from './authentication/guards/auth-guards';
import { ErrorPageComponent } from './shared/components/error-page/error-page.component';

const routes: Routes = [
	{ path: 'results', component: ResultsPageComponent },
	{ path: 'home', component: HomePageComponent },
	{ path: '', component: HomePageComponent },
	{ path: 'volumes/:id', component: DetailsPageComponent },
	{ path: 'signIn', component: SignInFormComponent },
	{
		path: 'myVolumes',
		component: MyVolumesPageComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'volumeForm',
		component: VolumeFormComponent,
		canActivate: [AuthGuard]
	},
	{ path: '404', component: ErrorPageComponent },
	{ path: '**', redirectTo: '/404' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes), AuthenticationModule],
	exports: [RouterModule]
})
export class AppRoutingModule {}
