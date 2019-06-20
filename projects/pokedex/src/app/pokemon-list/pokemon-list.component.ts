import { Component, OnInit, OnDestroy } from '@angular/core';
import { Pokemon } from '../_models/pokemon.model';
import { PokemonService } from '../_services/pokemon.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';

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
  limit = 54;
  constructor(
    private pokeService: PokemonService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.subs = this.route.params.pipe(
      switchMap((params) => {
        if (+params.page < 1 || +params.page > Math.ceil( 964 / this.limit ) || isNaN(+params.page) ) {
          this.location.back();
        }
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

  getIdByUrl(url: string) {
    return url.split('/')[6];
  }
}
