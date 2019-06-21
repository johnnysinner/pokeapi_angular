import { Component, OnInit, OnDestroy } from '@angular/core';
import { PokemonService } from '../../_services/pokemon.service';
import { Subscription } from 'rxjs';
import { AllTypes } from '../../_models/types.model';

@Component({
  selector: 'app-pokemon-types',
  templateUrl: './pokemon-types.component.html',
  styleUrls: ['./pokemon-types.component.css']
})
export class PokemonTypesComponent implements OnInit , OnDestroy {
  types = new AllTypes();
  subs: Subscription;
  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.subs = this.pokemonService.getAllType().subscribe(
      (response: AllTypes) => {
        this.types = response;
        console.log(this.types);
        }
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
