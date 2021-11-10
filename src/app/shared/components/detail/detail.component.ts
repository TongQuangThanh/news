import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  item: any;
  source: any;
  list: any;
  constructor(private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.item = this.router.getCurrentNavigation().extras.state.item;
    this.source = this.router.getCurrentNavigation().extras.state.source;
    this.list = this.router.getCurrentNavigation().extras.state.list;
  }

  transformUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
