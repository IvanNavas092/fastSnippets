import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
@Component({
  selector: 'app-animation-login',
  imports: [LottieComponent],
  templateUrl: './animation-login.html',
  styleUrl: './animation-login.css'
})
export class AnimationLogin {
  options: AnimationOptions = {
    path: '/animation-login.json',
  };



}
