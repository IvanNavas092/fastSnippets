import { Pipe, PipeTransform } from '@angular/core';
import hljs from 'highlight.js';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlight',
})
export class HighlightPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(code: string, language: string = 'typescript'): SafeHtml {
    let highlighted: string;

    if (hljs.getLanguage(language)) {
      highlighted = hljs.highlight(code, { language }).value;
    } else {
      highlighted = hljs.highlightAuto(code).value;
    }

    return this.sanitizer.bypassSecurityTrustHtml(highlighted);
  }
}
