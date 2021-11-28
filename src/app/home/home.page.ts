import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { faList, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
  faLayerGroup = faLayerGroup;
  faList = faList;
  isRootPage = true;
  isNarrow = false;
  currentUrl: string;

  constructor(private router: Router) {
    router.events.subscribe((val: any) => {
      this.isRootPage = val.url === '/home/list' || val.url === '/home/group';
      this.currentUrl = val.url;
    });
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.isNarrow = document.body.clientWidth <= 400 ? true : false;
  }

  go(url: string) {
    this.router.navigateByUrl(`home/${url}`);
  }

  goBack() {
    if (this.currentUrl) {
      this.router.navigateByUrl(this.currentUrl.substring(0, this.currentUrl.lastIndexOf('/')));
    } else {
      this.router.navigateByUrl('home');
    }
  }
}
