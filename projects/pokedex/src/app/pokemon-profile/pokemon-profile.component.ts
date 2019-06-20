import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Pokemon } from '../_models/pokemon.model';
import { Subscription } from 'rxjs';
import { PokemonService } from '../_services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon-profile',
  templateUrl: './pokemon-profile.component.html',
  styleUrls: ['./pokemon-profile.component.css']
})
export class PokemonProfileComponent implements OnInit, OnDestroy {
  pokemon = new Pokemon();
  subs: Subscription;
  constructor(private pokemonService: PokemonService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subs = this.route.params.pipe(
      switchMap((params) => {
        return this.pokemonService.getPokemonDetailsByName(params.pokemonName);
      })
    ).subscribe((response: Pokemon) => {
      this.pokemon = response;
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
