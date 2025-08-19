import { Pipe, PipeTransform } from '@angular/core';
import hljs from 'highlight.js';

@Pipe({ name: 'highlight' })
export class HighlightPipe implements PipeTransform {
  transform(code: string): string {
    return hljs.highlightAuto(code).value;
  }
}
