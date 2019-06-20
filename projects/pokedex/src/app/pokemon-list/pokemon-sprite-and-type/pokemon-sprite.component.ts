import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PokemonService } from '../../_services/pokemon.service';
import { Pokemon } from '../../_models/pokemon.model';

@Component({
  selector: 'app-pokemon-sprite-and-type',
  templateUrl: './pokemon-sprite.component.html',
  styleUrls: ['./pokemon-sprite.component.css']
})
export class PokemonSpriteComponent implements OnInit, OnDestroy {
  @Input() pokemonName: string;
  pokemon = new Pokemon();
  subs: Subscription;
  pokemonSprite: string;
  defaultUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png';
  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.subs = this.pokemonService.getPokemonDetailsByName(this.pokemonName).subscribe(
      (response: Pokemon) => {
        this.pokemon = response;
        }
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  getImgUrl() {
    return (this.pokemon.sprites.front_default != null) ? this.pokemon.sprites.front_default : this.defaultUrl ;
  }

}
