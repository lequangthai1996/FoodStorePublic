import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-category-header',
  templateUrl: './category-header.component.html',
  styleUrls: ['./category-header.component.css']
})
export class CategoryHeaderComponent implements OnInit {
  title: Title;
  sort: any;
  constructor(private titleService: Title, private router: Router) {
    this.title = titleService;
  }
  header: string;
  ngOnInit() {
    this.sort = '-created_at';
  }
  changeSort(value) {
    this.sort = value;
    this.router.navigate([] , { queryParams: { sort: this.sort } });
  }
}
