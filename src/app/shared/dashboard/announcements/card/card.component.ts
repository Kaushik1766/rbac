import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';


type CardData = {
  title: string;
  content: string;
  date: Date;
}

@Component({
  selector: 'app-card',
  imports: [
    DatePipe
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  data = input.required<CardData>()
}
