import { sources } from './../shared/source';
import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit, AfterViewInit {
  sources = sources;
  isNarrow = false;
  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.isNarrow = document.body.clientWidth <= 400 ? true : false;
  }
}
