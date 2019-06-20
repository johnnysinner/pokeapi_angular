import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() limitPerPage: number;
  totalPageCount: number;
  pages = new Array();
  totalPokemon = 964;
  currentPage: number;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.totalPageCount = Math.ceil( this.totalPokemon / 50 );
    console.log(this.limitPerPage);
    for (let i = 0; i < this.totalPageCount; i++) {
        this.pages.push(i + 1);
    }
    this.route.params.subscribe(
      params => {
        this.currentPage = +params.page;
      }
    );
  }

  setCurrentPage(pageNum) {
    this.currentPage = pageNum;
  }

  checkIfFirstPage() {
    return (this.currentPage === 1) ? true : false ;
  }

}
