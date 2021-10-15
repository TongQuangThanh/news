import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { faList, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  faLayerGroup = faLayerGroup;
  faList = faList;
  constructor(private location: Location, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // this.isNavPage = this.router.url.includes('/home/list') || this.router.url.includes('/home/group');
  }
  goBack() {
    this.location.back();
  }
}
