import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textWrap',
})
export class TextWrapPipe implements PipeTransform {
  transform(value: string, maxChar : number) {
    if (!value) return null;
    return value.substring(0,maxChar) + '...';
  }
}
