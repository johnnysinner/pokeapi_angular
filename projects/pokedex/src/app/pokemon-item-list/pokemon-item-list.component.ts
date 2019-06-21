import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../_services/pokemon.service';
import { switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pokemon-item-list',
  templateUrl: './pokemon-item-list.component.html',
  styleUrls: ['./pokemon-item-list.component.css']
})
export class PokemonItemListComponent implements OnInit, OnDestroy {
  items: any;
  subs: Subscription;
  offset: number;
  currentPage: number;
  totalItems = 954;
  limit = 60;

  constructor(
    private pokeService: PokemonService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.subs = this.route.params.pipe(
      switchMap((params) => {
        if (+params.page < 1 || +params.page > Math.ceil( this.totalItems / this.limit ) || isNaN(+params.page) ) {
          this.location.back();
        }
        this.currentPage = params.page;
        this.offset = (+params.page - 1) * this.limit;
        return this.pokeService.getAllItems(this.offset, this.limit);
      })
    ).subscribe((response: any) => {
      this.items = response;
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
