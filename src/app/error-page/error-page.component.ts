import { Component } from '@angular/core';
import { ERROR_PAGE_STRINGS } from '../../constants/constants';

@Component({
  selector: 'app-error-page',
  imports: [],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.scss'
})
export class ErrorPageComponent {

  strings = ERROR_PAGE_STRINGS;

}
