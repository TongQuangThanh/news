import { SharedService } from './../../services/shared.service';
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
  constructor(private router: Router, private sanitizer: DomSanitizer, private sharedService: SharedService) { }

  ngOnInit() {
    this.item = this.router.getCurrentNavigation().extras.state.item;
    if (!this.item.link) {
      const parentUrl = this.router.url;
      this.sharedService.alertError(parentUrl.substring(0, parentUrl.lastIndexOf('/')));
    }
  }

  transformUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
