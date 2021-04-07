import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';

@Pipe({
  name: 'filterPipeCar',
})
export class FilterPipePipe implements PipeTransform {
  transform(value: Car[], filterText: string): Car[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';
    return filterText
      ? value.filter(
          (c: Car) =>
            c.brandName.toLocaleLowerCase().indexOf(filterText) !== -1 ||
            c.colorName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
