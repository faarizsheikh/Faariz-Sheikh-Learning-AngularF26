// app.component.ts:

import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  imports: [NgOptimizedImage],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})

export class App {
  quotedFilm : string = "IT";
  yearReleased: number = 1990;
  character: string = "Pennywise the Dancing Clown"
  actor: string = "Tim Curry";
}
