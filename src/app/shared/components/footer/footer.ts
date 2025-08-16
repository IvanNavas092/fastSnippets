import { Component } from '@angular/core';
import { Logo } from '../logo/logo';

@Component({
  selector: 'app-footer',
  imports: [Logo],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
 currentYear = new Date().getFullYear();

  footerSections = [
    {
      title: 'Contacto',
      links: [
        { label: 'Twitter', url: 'https://twitter.com/fastsnippets' },
        { label: 'GitHub', url: 'https://github.com/fastsnippets' },
        { label: 'YouTube', url: 'https://www.youtube.com/channel/UC9-y-6csu5WGm29I7JiwpnA' }
      ]
    },
    {
      title: 'Recursos',
      links: [
        { label: 'Documentación', url: '#' },
        { label: 'Blog', url: '#' },
        { label: 'FAQ', url: '#' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Términos y condiciones', url: '#' },
        { label: 'Política de privacidad', url: '#' }
      ]
    }
  ];
}
