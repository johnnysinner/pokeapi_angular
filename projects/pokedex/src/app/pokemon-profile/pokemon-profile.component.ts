import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Pokemon } from '../_models/pokemon.model';
import { Subscription } from 'rxjs';
import { PokemonService } from '../_services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { SpeciesClass } from '../_models/pokemon-species.model';

@Component({
  selector: 'app-pokemon-profile',
  templateUrl: './pokemon-profile.component.html',
  styleUrls: ['./pokemon-profile.component.css']
})
export class PokemonProfileComponent implements OnInit, OnDestroy {
  name: any;
  subs: Subscription;
  pokemon = new Pokemon();
  pokemonSpecies = new SpeciesClass();
  pokemonName: string;
  defaultImg = 'https://image.flaticon.com/icons/png/128/528/528101.png';
  isPokemonExist: boolean;
  check: boolean;
  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private location: Location,
    ) { }

  ngOnInit() {
    this.check = false;
    this.subs = this.route.params.pipe(
      switchMap((params) => {
        return this.pokemonService.getPokemonDetailsByName(params.pokemonName).pipe(
          switchMap((pokemonresponse: Pokemon) => {
            this.isPokemonExist = true;
            this.pokemon = pokemonresponse;
            return this.pokemonService.getPokemonSpeciesByUrl(pokemonresponse.species.url);
          })
        );
      })
    ).subscribe(
      (pokemonSpeciesResponse: SpeciesClass) => {
      this.pokemonSpecies = pokemonSpeciesResponse;
      this.check = true;
      },
      error => {
        this. isPokemonExist = error.ok;
      }
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  goBack() {
    this.location.back();
  }

  goHome() {
    this.location.go('pokemon-list/1');
  }

  getImg() {
    return (this.pokemon.sprites.front_default !== null ) ? this.pokemon.sprites.front_default : this.defaultImg;
  }
}
