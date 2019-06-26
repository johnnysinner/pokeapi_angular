import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { SearchService } from '../../_services/search.service';
import { Subscription } from 'rxjs';
import { Pokemon, Results } from '../../_models/pokemon.model';

@Component({
  selector: 'app-pokemon-prev-next',
  templateUrl: './pokemon-prev-next.component.html',
  styleUrls: ['./pokemon-prev-next.component.css']
})
export class PokemonPrevNextComponent implements OnInit, OnDestroy,OnChanges {
  subs: Subscription;
  pokemonList: any = new Array();
  pokemon = new Pokemon();
  index: number;
  @Input() pokemonName: string;
  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.subs = this.searchService.getAllinTheList('pokemon').subscribe(
      ((response: any) => {
        this.pokemon = response;
        this.pokemonList = response.results;
        this.index = this.pokemon.results.map(
          res => {
            return res.name;
          }
        ).indexOf(this.pokemonName);
      })
    );
  }
 ngOnChanges() {
  this.index = this.pokemonList.map(
    (res: Results) => {
      return res.name;
    }
  ).indexOf(this.pokemonName);
  console.log(this.index);
 }
  goNext(): string {
    return (this.index === this.pokemonList.length - 1 ) ? 'none' : this.pokemon.results[this.index + 1].name;
  }
  goPrevious(): string {
    return (this.index === 0) ? 'none' : this.pokemon.results[this.index - 1].name;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
