import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lowercaseTrunc',
})
export class LowercaseTruncPipe implements PipeTransform {
  transform(value: string | undefined | null): string | undefined {
    if (value === null || value === undefined) {
      return '';
    }
    return value.substring(0, 4).toLowerCase();
  }
}
