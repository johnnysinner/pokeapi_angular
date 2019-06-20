import { Component, OnInit, OnDestroy } from '@angular/core';
import { Pokemon } from '../_models/pokemon.model';
import { PokemonService } from '../_services/pokemon.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit, OnDestroy {
  pokemonList = new Pokemon();
  subs: Subscription;
  offset: number;
  currentPage: number;
  limit = 50;
  constructor(
    private pokeService: PokemonService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.subs = this.route.params.pipe(
      switchMap((params) => {
        this.currentPage = params.page;
        this.offset = (+params.page - 1) * this.limit;
        return this.pokeService.getPokemonList(this.offset, this.limit);
      })
    ).subscribe((response: Pokemon) => {
      this.pokemonList = response;
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
