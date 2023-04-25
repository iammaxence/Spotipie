import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'split'
  })

export class SplitPipe implements PipeTransform {

    transform(text: String, by: String, index: number): String {

        return text.split(":")[index];
    }
}