import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private baseUrl = 'https://pokeapi.co/api/v2';
  constructor(private http: HttpClient) { }

  getAllinTheList(item: string): Observable<any> {
    return this.http.get<any>(`https://pokeapi.co/api/v2/${item}/?offset=0&limit=999`);
  }
}
