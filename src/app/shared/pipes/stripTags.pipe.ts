import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'striptags'
})
export class StripTagsPipe implements PipeTransform {
	transform(value: string): any {
		return value.replace(/(<([^>]+)>)/gi, '');
	}
}
