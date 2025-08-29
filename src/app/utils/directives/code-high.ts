// import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';
// import hljs from 'highlight.js';

// @Directive({
//   selector: '[appCodeHigh]',
// })
// export class CodeHigh implements AfterViewInit {
//   @Input('appCodeHigh') language: string = '';

//   constructor(private el: ElementRef) {}

//   ngAfterViewInit() {
//     const codeElement = this.el.nativeElement;

//     // Asegurar que tenga la clase 'hljs' para los estilos
//     codeElement.classList.add('hljs');

//     if (this.language && hljs.getLanguage(this.language)) {
//       hljs.highlightElement(codeElement);
//     } else {
//       hljs.highlightAuto(codeElement.textContent || '');
//     }
//   }
// }
