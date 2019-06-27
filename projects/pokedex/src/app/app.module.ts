import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PokemonListComponent } from './pokemon-components/pokemon-list/pokemon-list.component';
import { PokemonSpriteComponent } from './pokemon-components/pokemon-sprite-and-type/pokemon-sprite.component';
import { PaginationComponent } from './page-components/pagination/pagination.component';
import { FormatNamePipe } from './_pipe/formatname.pipe';
import { PageNotFoundComponent } from './page-components/page-not-found/page-not-found.component';
import { PokemonProfileComponent } from './pokemon-components/pokemon-profile/pokemon-profile.component';
import { PokemonTopBarComponent } from './page-components/pokemon-top-bar/pokemon-top-bar.component';
import { PokemonEvolutionChainComponent } from './pokemon-components/pokemon-evolution-chain/pokemon-evolution-chain.component';
import { PokemonAbilitiesDetailsComponent } from './pokemon-components/pokemon-abilities-details/pokemon-abilities-details.component';
import { PokemonTypesComponent } from './pokemon-components/pokemon-types/pokemon-types.component';
import { PokemonHomePageComponent } from './page-components/pokemon-home-page/pokemon-home-page.component';
import { PokemonItemListComponent } from './pokemon-item-list/pokemon-item-list.component';
import { PokemonItemComponent } from './pokemon-item/pokemon-item.component';
import { PokemonListByTypeComponent } from './pokemon-components/pokemon-list-by-type/pokemon-list-by-type.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SearchComponent } from './page-components/search/search.component';

import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { PokemontryComponent } from './pokemontry/pokemontry.component';
import { PokemonPrevNextComponent } from './page-components/pokemon-prev-next/pokemon-prev-next.component';
import {SlideshowModule} from 'ng-simple-slideshow';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatSidenavModule, MatListModule, MatButtonModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonSpriteComponent,
    PaginationComponent,
    FormatNamePipe,
    PageNotFoundComponent,
    PokemonProfileComponent,
    PokemonTopBarComponent,
    PokemonEvolutionChainComponent,
    PokemonAbilitiesDetailsComponent,
    PokemonListByTypeComponent,
    PokemonTypesComponent,
    PokemonHomePageComponent,
    PokemonItemListComponent,
    PokemonItemComponent,
    SearchComponent,
    PokemontryComponent,
    PokemonPrevNextComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AutocompleteLibModule,
    SlideshowModule,
    // https://www.npmjs.com/package/ng-simple-slideshow
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
