import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'formatName'})

export class FormatNamePipe implements PipeTransform {
  transform(value: string): string {
    return value.split('-').map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`).join(' ');
  }
}
