import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../_models/pokemon.model';
import { SpeciesClass } from '../_models/pokemon-species.model';
import { map, switchMap } from 'rxjs/operators';
import { Chain } from '../_models/pokemon-evolution.model';
import { AbilitiesClass } from '../_models/pokemon-abilities.model';
import { TypeClass } from '../_models/pokemon-type.model';
import { AllTypes } from '../_models/types.model';
import { Items } from '../_models/pokemon-item.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';
  constructor(private http: HttpClient) { }

  getPokemonList(offset: number, limit: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.baseUrl}/pokemon?offset=${offset}&limit=${limit}`);
  }

  getPokemonDetailsByName(pokemonName: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.baseUrl}/pokemon/${pokemonName}`);
  }

  getPokemonDetailsByUrl(url: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(url);
  }

  getPokemonSpeciesByUrl(url: string): Observable<SpeciesClass> {
    return this.http.get<SpeciesClass>(url);
  }

  getEvolutionChain(name: string): Observable<Chain> {
    return this.http.get<any>(`${this.baseUrl}/pokemon/${name}`).pipe(
      switchMap(
        (response) => {
        return this.http.get<SpeciesClass>(this.checkUrl(response.species.url)).pipe(
          switchMap(
            (response1: SpeciesClass) => {
              return this.http.get<any>(response1.evolution_chain.url).pipe(
                map((response2: any) => {
                  return response2.chain;
                })
              );
            }
          )
        );
      })
    );
  }

  getAbilityDetails(url: string): Observable<AbilitiesClass> {
    return this.http.get<AbilitiesClass>(url);
  }

  getPokemonByType(type: string): Observable<TypeClass> {
    return this.http.get<TypeClass>(`${this.baseUrl}/type/${type}`);
  }

  getAllType(): Observable<AllTypes> {
    return this.http.get<AllTypes>(`${this.baseUrl}/type/`);
  }

  getAllItems(offset: number, limit: number): Observable<any> {
    return this.http.get<any>(`https://pokeapi.co/api/v2/item/?offset=${offset}&limit=${limit}`).pipe(
      map((response) => {
        return response.results;
      })
    );
  }

  getItemDetails(url: string): Observable<Items> {
    return this.http.get<Items>(url);
  }

  checkUrl(url: string) {
    if ( url.charAt(url.length - 1) === '/') {
      return url.substring(0, url.length - 1);
    } else {
      return url;
    }
  }
}
