import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchService } from '../../_services/search.service';
import { Pokemon } from '../../_models/pokemon.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  pokemonList = new Array();
  subs: Subscription;
  pokemon: Pokemon;
  name = '';
  /**
   * Form
   */
  reactiveForm: FormGroup;

  public placeholder = 'Enter Pokemon Name';
  public keyword = 'name';
  public historyHeading = 'Recently selected';

  constructor(private formBuilder: FormBuilder, private searchService: SearchService) {
    this.reactiveForm = formBuilder.group({
      name: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.subs = this.searchService.getAllinTheList('pokemon').subscribe(
      response => {
        response.results.forEach( element => {
          this.pokemonList.push(this.convertName(element.name));
        });
      });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

submitTemplateForm() {
  window.location.reload();
}

submitReactiveForm() {
  if (this.reactiveForm.valid) {
  }
}
convertName(value: string) {
  return value.split('-').map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`).join(' ');
}

revertName(value: string) {
  return value.split(' ').map(word => `${word.charAt(0).toLowerCase()}${word.slice(1)}`).join('-');
}

}
