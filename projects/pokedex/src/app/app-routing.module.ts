import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonListComponent } from './pokemon-components/pokemon-list/pokemon-list.component';
import { PageNotFoundComponent } from './page-components/page-not-found/page-not-found.component';
import { PokemonProfileComponent } from './pokemon-components/pokemon-profile/pokemon-profile.component';
import { PokemonHomePageComponent } from './page-components/pokemon-home-page/pokemon-home-page.component';
import { PokemonItemListComponent } from './pokemon-item-list/pokemon-item-list.component';
import { PokemonListByTypeComponent } from './pokemon-components/pokemon-list-by-type/pokemon-list-by-type.component';

const routes: Routes = [
{path: 'pokemon-list', redirectTo: 'pokemon-list/1', pathMatch: 'full'},
{path: 'pokemon-type', redirectTo: 'pokemon-type/normal', pathMatch: 'full'},
{path: 'items', redirectTo: 'items/1', pathMatch: 'full'},
{path: 'pokemon-list/:page', component: PokemonListComponent},
{path: '', component: PokemonHomePageComponent},
{path: 'pokemon-type/:type', component: PokemonListByTypeComponent},
{path: 'pokemon/:pokemonName', component: PokemonProfileComponent},
{path: 'items/:page', component: PokemonItemListComponent},
{path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
