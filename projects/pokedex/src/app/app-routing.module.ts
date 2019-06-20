import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PokemonProfileComponent } from './pokemon-profile/pokemon-profile.component';

const routes: Routes = [
{path: '', redirectTo: 'pokemon-list/1', pathMatch: 'full'},
{path: 'pokemon-list/', redirectTo: 'pokemon-list/1', pathMatch: 'full'},
{path: 'pokemon-list/:page', component: PokemonListComponent},
{path: 'pokemon/:pokemonName', component: PokemonProfileComponent},
{path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
