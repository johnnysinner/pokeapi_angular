import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { Pokemon } from '../../_models/pokemon.model';
import { Subscription } from 'rxjs';
import { PokemonService } from '../../_services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { SpeciesClass } from '../../_models/pokemon-species.model';

@Component({
  selector: 'app-pokemon-profile',
  templateUrl: './pokemon-profile.component.html',
  styleUrls: ['./pokemon-profile.component.css']
})
export class PokemonProfileComponent implements OnInit, OnDestroy, OnChanges {
  @Input() pageFrom: string;
  name: any;
  subs: Subscription;
  pokemon = new Pokemon();
  pokemonSpecies = new SpeciesClass();
  pokemonName: string;
  defaultImg = 'https://image.flaticon.com/icons/png/128/528/528101.png';
  isPokemonExist: boolean;
  check: boolean;
  showDetailsBoolean: boolean;
  genusName: string;
  japaneseName: string;
  imageSources = new Array();
  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private location: Location,
    ) { }

  ngOnChanges() {
    console.log('asd');
  }

  ngOnInit() {
    this.check = false;
    this.subs = this.route.params.pipe(
      switchMap((params) => {
        return this.pokemonService.getPokemonDetailsByName(params.pokemonName).pipe(
          switchMap((pokemonresponse: Pokemon) => {
            this.isPokemonExist = true;
            this.pokemon = pokemonresponse;
            return this.pokemonService.getPokemonSpeciesByUrl(this.checkUrl(pokemonresponse.species.url));
          })
        );
      })
    ).subscribe(
      (pokemonSpeciesResponse: SpeciesClass) => {
      this.pokemonSpecies = pokemonSpeciesResponse;
      this.check = true;
      this.getOtherDetails();
      this.imageSources = [];
      this.pushImageUrl(this.pokemon.sprites.front_default, this.imageSources);
      this.pushImageUrl(this.pokemon.sprites.back_default, this.imageSources);
      this.pushImageUrl(this.pokemon.sprites.front_shiny, this.imageSources);
      this.pushImageUrl(this.pokemon.sprites.back_shiny, this.imageSources);
    },
      error => {
        this. isPokemonExist = error.ok;
      }
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  goBack() {
    this.location.back();
  }

  goHome() {
    this.location.go('pokemon-list/1');
  }

  getImg(imageUrl: string) {
    return (imageUrl !== null ) ? imageUrl : this.defaultImg;
  }

  showDetails() {
    this.showDetailsBoolean = !this.showDetailsBoolean;
  }

  getGenderRate(genderRate: number) {
    switch (genderRate) {
      case 1:
        return '100% Male';
      case 2:
        return '87.5% Male | 12.5% Female';
      case 3:
        return '75.0% Male | 25.0% Female';
      case 4:
        return '50.0% Male | 50.0% Female';
      case 5:
        return '25.0% Male | 75.0% Female';
      case 6:
        return '12.5% Male | 87.5% Female';
      case 7:
        return '100% Female';
      case 8:
        return 'Genderless';
      case 9:
        return 'Trivia';
    }
  }

  computeForPercentage(stats: number) {
    return (stats * 100 / 255) + '%';
  }

  checkUrl(url: string) {
    if ( url.charAt(url.length - 1) === '/') {
      return url.substring(0, url.length - 1);
    } else {
      return url;
    }
  }

  getOtherDetails() {
    for (const gen of this.pokemonSpecies.genera) {
      if (gen.language.name === 'en') {
        this.genusName = gen.genus;
        break;
      }
    }
    for (const gen of this.pokemonSpecies.names) {
      if (gen.language.name === 'ja') {
        this.japaneseName = gen.name;
        break;
      }
    }
  }

  pushImageUrl(sprites: string, imageSources: any) {
    const url = this.getImg(sprites);
    imageSources.push(url);
  }
}
