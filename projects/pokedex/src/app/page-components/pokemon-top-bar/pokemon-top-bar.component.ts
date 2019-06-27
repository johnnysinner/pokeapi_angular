import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-pokemon-top-bar',
  templateUrl: './pokemon-top-bar.component.html',
  styleUrls: ['./pokemon-top-bar.component.css']
})
export class PokemonTopBarComponent implements OnInit {
  isSearchShown: boolean;
  constructor() { }

  ngOnInit() {
    this.isSearchShown = true;
  }

  showHideSearch() {
    this.isSearchShown = !this.isSearchShown;
  }

}
