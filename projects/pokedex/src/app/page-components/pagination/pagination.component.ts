import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit , OnDestroy {
  @Input() limitPerPage: number;
  @Input() totalItem: number;
  totalPageCount: number;
  pages = new Array();
  currentPage: number;
  subs: Subscription;
  middlePages = new Array();
  goToPage = new FormControl('');
  isGoToShown: boolean;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.isGoToShown = false;
    this.totalPageCount = Math.ceil( this.totalItem / this.limitPerPage );
    for (let i = 0; i < this.totalPageCount; i++) {
        this.pages.push(i + 1);
    }
    this.middlePages = this.pages.slice(1, this.pages.length - 1);
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

  isShown(pageNum: number) {
    if (pageNum === 3 ) {
      return 'false';
    } else {
      return true;
    }
  }

  goToPageNum(value: string) {
    return value;
  }
}
