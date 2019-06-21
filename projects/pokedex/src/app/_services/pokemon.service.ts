import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../_models/pokemon.model';
import { SpeciesClass } from '../_models/pokemon-species.model';
import { map } from 'rxjs/operators';
import { Chain } from '../_models/pokemon-evolution.model';
import { AbilitiesClass } from '../_models/pokemon-abilities.model';
import { TypeClass } from '../_models/pokemon-type.model';
import { AllTypes } from '../_models/types.model';

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

  getPokemonSpeciesByUrl(url: string): Observable<SpeciesClass> {
    return this.http.get<SpeciesClass>(url);
  }

  getEvolutionChain(url: string): Observable<Chain> {
    return this.http.get<any>(url).pipe(
      map((response) => {
        return response.chain;
      })
    );
  }

  getAbilityDetails(url: string): Observable<AbilitiesClass> {
    return this.http.get<any>(url).pipe(
      map((response) => {
        return response.effect_entries;
      })
    );
  }

  getPokemonByType(type: string): Observable<TypeClass> {
    return this.http.get<TypeClass>(`${this.baseUrl}/type/${type}`);
  }

  getAllType(): Observable<AllTypes> {
    return this.http.get<AllTypes>(`${this.baseUrl}/type/`);
  }
}
