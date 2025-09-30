import { AfterViewInit, Component, ElementRef, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from '@/app/core/interfaces/Message';
import { marked } from 'marked';
import hljs from 'highlight.js/lib/core';

@Component({
  selector: 'app-message-box',
  imports: [CommonModule],
  templateUrl: './message-box.html',
  styles: ``,
})
export class MessageBox implements AfterViewInit {
  msg = input<Message>();
  parts: { type: 'text' | 'code'; content: string; lang?: string }[] = [];

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.highlightAll();
  }

  formatMessage(message: string | undefined) {
    if (!message) return '';
    return marked.parse(message);
  }

  parseMessage(text: string) {
    const parts = [];
    let lastIndex = 0;
    const regex = /```(\w+)?\n([\s\S]*?)```/g;

    text.replace(regex, (match, lang, code, offset) => {
      if (offset > lastIndex) {
        parts.push({ type: 'text', content: text.slice(lastIndex, offset) });
      }
      parts.push({ type: 'code', content: code, lang });
      lastIndex = offset + match.length;
      return match;
    });

    if (lastIndex < text.length) {
      parts.push({ type: 'text', content: text.slice(lastIndex) });
    }

    return parts;
  }

  highlightAll() {
    this.el.nativeElement
      .querySelectorAll('pre code')
      .forEach((block: HTMLElement) => {
        hljs.highlightElement(block);
      });
  }
}
