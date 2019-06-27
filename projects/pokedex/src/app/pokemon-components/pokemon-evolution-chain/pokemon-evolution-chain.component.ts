import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { Chain } from '../../_models/pokemon-evolution.model';
import { SpeciesClass } from '../../_models/pokemon-species.model';
import { switchMap } from 'rxjs/operators';
import { PokemonService } from '../../_services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { Name } from '../../_models/pokemon-abilities.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pokemon-evolution-chain',
  templateUrl: './pokemon-evolution-chain.component.html',
  styleUrls: ['./pokemon-evolution-chain.component.css']
})
export class PokemonEvolutionChainComponent implements OnInit, OnDestroy, OnChanges {
  @Input() speciesUrl: string;
  subs: Subscription;
  chain = new Chain();
  check: boolean;
  pokemon: string;
  level0: string;
  imgUrl = 'https://cdn4.iconfinder.com/data/icons/defaulticon/icons/png/256x256/arrow-alt-right.png';
  constructor(private pokemonService: PokemonService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.check = false;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ngOnChanges() {
    this.subs = this.route.params.pipe(
      switchMap(params => {
        return this.pokemonService.getEvolutionChain(params.pokemonName);
      })
    ).subscribe(
      (pokemonEvolution: Chain) => {
        this.chain = pokemonEvolution;
        this.check = true;
      });
  }

  checkIfThereIsThirdEvolution(evolutionTo: any) {
    if (evolutionTo.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  checkIfItIsWrongInApi(pokemonName: string) {
    if (pokemonName === 'wormadam') {
      return 'wormadam-plant';
    } else if (pokemonName === 'darmanitan') {
      return 'darmanitan-zen';
    } else if (pokemonName === 'pumpkaboo') {
      return 'pumpkaboo-average';
    } else if (pokemonName === 'gourgeist') {
      return 'gourgeist-average';
    } else {
      return pokemonName;
    }
  }

}
