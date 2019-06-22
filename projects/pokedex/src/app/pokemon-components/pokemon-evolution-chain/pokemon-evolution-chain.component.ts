import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Chain } from '../../_models/pokemon-evolution.model';
import { SpeciesClass } from '../../_models/pokemon-species.model';
import { switchMap } from 'rxjs/operators';
import { PokemonService } from '../../_services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { Name } from '../../_models/pokemon-abilities.model';

@Component({
  selector: 'app-pokemon-evolution-chain',
  templateUrl: './pokemon-evolution-chain.component.html',
  styleUrls: ['./pokemon-evolution-chain.component.css']
})
export class PokemonEvolutionChainComponent implements OnInit, OnDestroy {
  @Input() speciesUrl: string;
  subs: any;
  chain = new Chain();
  check: boolean;
  pokemon: string;
  imgUrl = 'https://cdn4.iconfinder.com/data/icons/defaulticon/icons/png/256x256/arrow-alt-right.png';
  constructor(private pokemonService: PokemonService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.check = false;
    this.subs = this.route.params.pipe(
      switchMap(params => {
        return this.pokemonService.getEvolutionChain(params.pokemonName);
      })
    ).subscribe(
      (pokemonEvolution: Chain) => {
        console.log(pokemonEvolution);
        this.chain = pokemonEvolution;
        this.check = true;
      });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  checkIfThereIsThirdEvolution(evolutionTo: any) {
    if (evolutionTo.length > 0) {
      return true;
    } else {
      return false;
    }
  }
}
