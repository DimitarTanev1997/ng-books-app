import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from './services/http-service/http.service';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { StripTagsPipe } from './pipes/stripTags.pipe';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LoadingSpinnerComponent, StripTagsPipe, ErrorPageComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [LoadingSpinnerComponent, StripTagsPipe, ErrorPageComponent],
  providers: [HttpService]
})
export class SharedModule { }