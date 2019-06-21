import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { PokemonService } from '../_services/pokemon.service';
import { Items } from '../_models/pokemon-item.model';

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.css']
})
export class PokemonItemComponent implements OnInit , OnDestroy {
  @Input() itemUrl: string;
  subs: Subscription;
  item = new Items();
  checker: boolean;
  constructor(
    private pokeService: PokemonService) { }

  ngOnInit() {
    this.checker = false;
    this.subs = this.pokeService.getItemDetails(this.itemUrl).subscribe(
      (response: Items) => {
      this.item = response;
      this.item.sprites.default = response.sprites.default;
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  getUrl() {
    return (this.item.sprites.default !== null ) ? this.item.sprites.default : '/assets/pokeball.gif' ;
  }

  showHide() {
    this.checker = !this.checker;
  }
}
