import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { map, Observable, tap } from 'rxjs';

import { GiphyItem, GiphyReponse } from '../interfaces/giphy.interfaces';
import { GifMapper } from '../mapper/gif.mapper';
import { Gif } from './../interfaces/gif.interfaces';

const GIF_KEY = 'gifs';

const loadFromLocalStorage = () => {
  const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '[]';
  const gifs = JSON.parse(gifsFromLocalStorage);
  return gifs;
}

@Injectable({providedIn: 'root'})
export class GifService {

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed( () => Object.keys( this.searchHistory()));

  private http = inject(HttpClient);

  public gifs: GiphyItem[] = [];

  constructor() {
    this.loadTrendingGifs();
  }

  saveGifsToLocalStorage = effect(( ) => {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem('gifs', historyString);
  })


  loadTrendingGifs() {
    this.http.get<GiphyReponse>(`${ environment.giphyUrl }/gifs/trending`, {
      params:{
        api_key: environment.giphyApiKey,
        limit: 20,
      },
    }).subscribe( resp => {
      const gifs = GifMapper.mapGiphyItemToGifArray(resp.data);
      this.trendingGifs.set(gifs);
      this.trendingGifsLoading.set(false);
    });
  }

  searchGifs(query: string): Observable<Gif[]> {
    return this.http
      .get<GiphyReponse>(`${ environment.giphyUrl }/gifs/search`, {
        params:{
          api_key: environment.giphyApiKey,
          limit: 20,
          q: query
        },
      })
      .pipe(
        map( ({data}) => data ),
        map( (items) => GifMapper.mapGiphyItemToGifArray(items) ),

        // Historico de busca
        tap( items => {
          this.searchHistory.update( history => ({
            ...history, //pega o que esta originalmente, ou seja, o que ja foi feito de busca
            [query.toLocaleLowerCase()]: items, //seta a nova busca e o resultado dela
          }))
        })
      );
  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] ?? [];
  }

}
