import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonSpriteComponent } from './pokemon-list/pokemon-sprite-and-type/pokemon-sprite.component';
import { PaginationComponent } from './pagination/pagination.component';
import { FormatName } from './_pipe/formatname.pipe';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PokemonProfileComponent } from './pokemon-profile/pokemon-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonSpriteComponent,
    PaginationComponent,
    FormatName,
    PageNotFoundComponent,
    PokemonProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
