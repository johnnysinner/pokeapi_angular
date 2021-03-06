import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit , OnDestroy {
  @Input() limitPerPage: number;
  totalPageCount: number;
  pages = new Array();
  totalPokemon = 964;
  currentPage: number;
  subs: Subscription;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.totalPageCount = Math.ceil( this.totalPokemon / this.limitPerPage );
    for (let i = 0; i < this.totalPageCount; i++) {
        this.pages.push(i + 1);
    }
    this.subs = this.route.params.subscribe(
      params => {
        this.currentPage = +params.page;
      }
    );
  }

  setCurrentPage(pageNum: any) {
    this.currentPage = pageNum;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
