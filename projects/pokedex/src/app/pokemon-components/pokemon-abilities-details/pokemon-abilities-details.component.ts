import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AbilitiesClass } from '../../_models/pokemon-abilities.model';
import { Subscription } from 'rxjs';
import { PokemonService } from '../../_services/pokemon.service';

@Component({
  selector: 'app-pokemon-abilities-details',
  templateUrl: './pokemon-abilities-details.component.html',
  styleUrls: ['./pokemon-abilities-details.component.css']
})
export class PokemonAbilitiesDetailsComponent implements OnInit, OnDestroy {
  @Input() abilityUrl: string;
  ability: AbilitiesClass;
  subs: Subscription;
  check: boolean;
  isDetailShown: boolean;
  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.check = false;
    this.isDetailShown = false;
    this.subs = this.pokemonService.getAbilityDetails(this.abilityUrl).subscribe((response) => {
      this.ability = response;
      this.check = true;
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  showHide() {
    this.isDetailShown = !this.isDetailShown;
  }
}
