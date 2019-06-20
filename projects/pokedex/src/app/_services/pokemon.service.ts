import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../_models/pokemon.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';
  constructor(private http: HttpClient) { }

  getPokemonList(offset: number, limit: number): Observable<Pokemon> {
    return this.http.get<any>(`${this.baseUrl}/pokemon?offset=${offset}&limit=${limit}`).pipe(
      map(response => {
        return response.results;
      })
    );
  }
}
