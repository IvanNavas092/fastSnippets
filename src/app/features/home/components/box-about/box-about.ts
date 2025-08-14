import { aboutItem } from '@/app/core/interfaces/PopularSnippet';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-box-about',
  imports: [CommonModule],
  templateUrl: './box-about.html',
})
export class BoxAbout implements OnInit {
  @Input() item!: aboutItem;
  ngOnInit(): void {
    console.log(this.item);
  }
}
