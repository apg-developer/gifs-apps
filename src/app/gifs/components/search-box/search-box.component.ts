import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'search-box',
  template: `<input type="text"
  class="form-control"
  placeholder="Buscar gifs ..."
  (keyup.enter)="searchTag()"
  #txtTagSearch />`
})

export class SearchComponent {

  @ViewChild('txtTagSearch')
  public tagSearchInput! : ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService){}

  public searchTag(): void {
    const newTag = this.tagSearchInput.nativeElement.value
    this.gifsService.searchTag(newTag);
    this.tagSearchInput.nativeElement.value = ''
  }
}
