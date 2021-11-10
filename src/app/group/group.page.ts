import { Component, OnInit, AfterViewInit } from '@angular/core';
import { groups } from '../shared/source';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit, AfterViewInit {
  groups = groups;
  isNarrow = false;
  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.isNarrow = document.body.clientWidth <= 400 ? true : false;
  }
}
