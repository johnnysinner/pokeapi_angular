import { Component, OnInit, OnDestroy } from '@angular/core';
import { TypeClass } from '../../../_models/pokemon-type.model';
import { Subscription } from 'rxjs';
import { PokemonService } from '../../../_services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon-list-by-type',
  templateUrl: './pokemon-list-by-type.component.html',
  styleUrls: ['./pokemon-list-by-type.component.css']
})

export class PokemonListByTypeComponent implements OnInit, OnDestroy {
  pokemonType = new TypeClass();
  subs: Subscription;
  constructor(
    private pokeService: PokemonService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.subs = this.route.params.pipe(
      switchMap((params) => {
        return this.pokeService.getPokemonByType(params.type);
      })
    ).subscribe((response: TypeClass) => {
      this.pokemonType = response;
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
