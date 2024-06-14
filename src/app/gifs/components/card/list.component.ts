import { Component, Input } from '@angular/core';
import { Gifs } from '../../interfaces/search-response.interface';

@Component({
  selector: 'gifs-cards-list',
  templateUrl: 'list.component.html'
})

export class ListComponent {

  @Input()
  public gifs: Gifs[] = [];
}
