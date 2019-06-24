import { Component, OnInit, OnDestroy, PLATFORM_ID, APP_ID, Inject, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { PokemonService } from '../../_services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { TypeClass } from '../../_models/pokemon-type.model';
import { isPlatformBrowser, Location } from '@angular/common';

@Component({
  selector: 'app-pokemon-list-by-type',
  templateUrl: './pokemon-list-by-type.component.html',
  styleUrls: ['./pokemon-list-by-type.component.css']
})

export class PokemonListByTypeComponent implements OnInit, OnDestroy {
  pokemonType = new TypeClass();
  subs: Subscription;
  pokemonTypeParams: string;
  constructor(
    private pokeService: PokemonService,
    private route: ActivatedRoute,
    private location: Location,
    @Inject(PLATFORM_ID) private platformId,
    @Inject(APP_ID) private appId: string) { }

  ngOnInit() {
    this.subs = this.route.params.pipe(
      switchMap((params) => {
        this.pokemonTypeParams = params.type;
        return this.pokeService.getPokemonByType(params.type);
      })
    ).subscribe((response: TypeClass) => {
      this.pokemonType = response;
    }, error => this.location.back());
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
    const scrollToTop = window.setInterval(() => {
      const pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 80); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }
}
}
