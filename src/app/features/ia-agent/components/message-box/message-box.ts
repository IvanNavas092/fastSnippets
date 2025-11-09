import { Component, ElementRef, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from '@/app/core/interfaces/Message';
import { marked } from 'marked';
import hljs from 'highlight.js/lib/core';
import { Highlight } from "ngx-highlightjs";

@Component({
  selector: 'app-message-box',
  imports: [CommonModule, Highlight],
  templateUrl: './message-box.html',
  styles: ``,
})
export class MessageBox implements OnInit {
  msg = input<Message>();
  parts: { type: 'text' | 'code'; content: string; lang?: string }[] = [];

  constructor(private el: ElementRef) {
  }
  ngOnInit(): void {
    if (this.msg()) {
      this.parseMessage(this.msg()?.text || '');
    }
  }

  formatMessage(message: string | undefined) {
    if (!message) return '';
    return marked.parse(message);
  }

  parseMessage(text: string) {

    // regex: search ```lang ... ```
    const regex = /```(\w+)?\n([\s\S]*?)```/g;

    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      const [fullMatch, lang, code] = match;

      // 1. Texto antes del bloque de código
      if (match.index > lastIndex) {
        let content = text.slice(lastIndex, match.index).trim();
        content = content.replace(/---/g, '\n');

        this.parts.push({
          type: 'text',
          content
        });
      }

      // 2. code
      this.parts.push({
        type: 'code',
        content: code.trim(),
        lang: lang || 'plaintext'
      });


      lastIndex = regex.lastIndex;
    }

    // 3. text later of last code block
    if (lastIndex < text.length) {
      let content = text.slice(lastIndex).trim();
      content = content.replace(/---/g, '\n');

      this.parts.push({
        type: 'text',
        content
      });
    }

    return this.parts;
  }

  highlightAll() {
    this.el.nativeElement
      .querySelectorAll('pre code')
      .forEach((block: HTMLElement) => {
        hljs.highlightElement(block);
      });
  }
}
