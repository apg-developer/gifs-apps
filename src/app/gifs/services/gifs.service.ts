import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gifs, SearchResponse } from '../interfaces/search-response.interface';

const apiKeyForGiphy = 't8TQumWXriXmBUMmxPWdaX6r1US5Y4fB';
const urlForGiphy: string = 'https://api.giphy.com';
const searchEndpoint: string = 'v1/gifs/search';

@Injectable({ providedIn: 'root' })
export class GifsService {
  constructor(private httpClient: HttpClient) {
    this.getHistoryFromLocalStorage();
  }

  private _tagsHistory: string[] = [];
  private _gifs: Gifs[] = [];

  get Gifs() {
    return this._gifs;
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private handleTagsHistory(tag: string): void {
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter(t => t !== tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveHistoryToLocalStorage();
  }

  private initGifs(): void {
    if (this._tagsHistory?.length === 0) return;
    var firstTag = this._tagsHistory[0];
    this.searchTag(firstTag);
  }

  private getHistoryFromLocalStorage():void{
    const history = localStorage.getItem('tagsHistory');
    if(!history) return;
    this._tagsHistory = JSON.parse(history);

    this.initGifs();
  }

  private saveHistoryToLocalStorage():void{
    localStorage.setItem('tagsHistory', JSON.stringify(this._tagsHistory));
  }

  public searchTag(tag: string) {

    if (tag.length === 0) return;

    let params: HttpParams = new HttpParams()
      .set('api_key', apiKeyForGiphy)
      .set('q', tag)
      .set('limit', 10);

    this.httpClient.get<SearchResponse>(`${urlForGiphy}/${searchEndpoint}`, { params })
      .subscribe(response => {
        this._gifs = response.data;
      });

    this.handleTagsHistory(tag);
  }
}
