import { aboutItem } from '@/app/core/interfaces/ItemAbout';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-box-about',
  imports: [CommonModule],
  templateUrl: './box-about.html',
})
export class BoxAbout {
  @Input() item!: aboutItem;

}
